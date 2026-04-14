import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { createClient } from 'next-sanity';

type PortableTextBlock = any;
type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

type PortableTextLinkMark = {
  _key: string;
  _type: 'link';
  href: string;
};

type PortableTextBlockWithLists = PortableTextBlock & {
  _key: string;
  style: string;
  children: PortableTextSpan[];
  markDefs: PortableTextLinkMark[];
  listItem?: 'bullet' | 'number';
  level?: number;
};

type SanityImportDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const textReplacements: Array<[string, string]> = [
  ['Ã¢â‚¬â€ ', '-'],
  ['Ã¢â‚¬âœ', '-'],
  ['Ã¢â‚¬Â¢', '-'],
  ['Ã¢â‚¬â„¢', "'"],
  ['Ã¢â‚¬Å“', '"'],
  ['Ã¢â‚¬\u009d', '"'],
  ['Ã¢â‚¬"', '"'],
  ['Ã‚Â©', '(c)'],
  ['Ã¢Å“â€¦', 'Success'],
  ['Ã¢â‚¬Æ’', ''],
];

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-27';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local before importing.');
}

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN. Create a write token in Sanity manage and add it to .env.local.');
}

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function loadEnvFiles() {
  const processWithLoader = process as typeof process & {
    loadEnvFile?: (path?: string) => void;
  };

  const candidates = ['.env.local', '.env'];
  for (const candidate of candidates) {
    const resolved = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(resolved) && processWithLoader.loadEnvFile) {
      processWithLoader.loadEnvFile(resolved);
    }
  }
}

function createKey(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return textReplacements.reduce(
    (current, [search, replacement]) => current.split(search).join(replacement),
    value
  ).trim();
}

function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function textNodeToSpan(text: string, marks: string[]): PortableTextSpan | null {
  const normalized = text.replace(/\s+/g, ' ');
  if (!normalized.trim()) {
    return null;
  }

  return {
    _type: 'span',
    _key: createKey(),
    text: normalized,
    marks,
  };
}

function collectInlineContent(
  node: Node,
  marks: string[],
  spans: PortableTextSpan[],
  markDefs: PortableTextLinkMark[]
) {
  if (node.nodeType === node.TEXT_NODE) {
    const span = textNodeToSpan(node.textContent || '', marks);
    if (span) {
      spans.push(span);
    }
    return;
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'br') {
    const span = textNodeToSpan('\n', marks);
    if (span) {
      spans.push(span);
    }
    return;
  }

  let nextMarks = marks;

  if (tagName === 'strong' || tagName === 'b') {
    nextMarks = [...marks, 'strong'];
  } else if (tagName === 'em' || tagName === 'i') {
    nextMarks = [...marks, 'em'];
  } else if (tagName === 'code') {
    nextMarks = [...marks, 'code'];
  } else if (tagName === 'a') {
    const href = normalizeText(element.getAttribute('href'));
    if (href) {
      const existing = markDefs.find((markDef) => markDef.href === href);
      const linkKey = existing?._key || createKey();

      if (!existing) {
        markDefs.push({
          _key: linkKey,
          _type: 'link',
          href,
        });
      }

      nextMarks = [...marks, linkKey];
    }
  }

  for (const child of element.childNodes) {
    collectInlineContent(child, nextMarks, spans, markDefs);
  }
}

function createTextBlock(
  element: Element,
  style: string,
  options: Pick<PortableTextBlockWithLists, 'listItem' | 'level'> = {}
): PortableTextBlockWithLists | null {
  const spans: PortableTextSpan[] = [];
  const markDefs: PortableTextLinkMark[] = [];

  // Special handling for image mapping: convert images into Sanity portable text images (or skip/log them for now)
  if (element.tagName.toLowerCase() === 'img') {
    const src = element.getAttribute('src');
    const alt = element.getAttribute('alt');
    // If it's an image block, we can just insert a placeholder or an actual image block if supported.
    // For now we'll just insert a normal text noting the image if needed, or if we want to actually upload it.
    // Wait! Actually `article-images` is public folder, meaning they are probably just referenced inside the PortableText?
    // Wait, Sanity's PortableText `image` type expects an asset reference.
    // In our case, we might need an image block:
    return {
      _type: 'image',
      _key: createKey(),
      url: src,
      altText: alt,
    } as any;
  }

  for (const child of element.childNodes) {
    collectInlineContent(child, [], spans, markDefs);
  }

  if (spans.length === 0) {
    const fallbackText = normalizeText(element.textContent);
    if (!fallbackText) {
      return null;
    }

    spans.push({
      _type: 'span',
      _key: createKey(),
      text: fallbackText,
      marks: [],
    });
  }

  return {
    _type: 'block',
    _key: createKey(),
    style,
    children: spans,
    markDefs,
    ...(options.listItem ? { listItem: options.listItem } : {}),
    ...(options.level ? { level: options.level } : {}),
  };
}

function appendBlocksFromNode(node: Node, blocks: PortableTextBlockWithLists[], level = 1) {
  if (node.nodeType === node.TEXT_NODE) {
    const text = normalizeText(node.textContent);
    if (text) {
      blocks.push({
        _type: 'block',
        _key: createKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: createKey(),
            text,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }
    return;
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  // If node is an image directly in a wrapping element
  if (tagName === 'p' && element.childNodes.length === 1 && (element.childNodes[0] as Element).tagName?.toLowerCase() === 'img') {
    const imgElement = element.childNodes[0] as Element;
    blocks.push(createTextBlock(imgElement, 'normal') as any);
    return;
  }

  if (tagName === 'p') {
    const block = createTextBlock(element, 'normal');
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
    const block = createTextBlock(element, tagName);
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'blockquote') {
    const block = createTextBlock(element, 'blockquote');
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'ul' || tagName === 'ol') {
    const listItem = tagName === 'ol' ? 'number' : 'bullet';
    for (const child of Array.from(element.children)) {
      if (child.tagName.toLowerCase() !== 'li') {
        continue;
      }

      const block = createTextBlock(child, 'normal', {
        listItem,
        level,
      });

      if (block) {
        blocks.push(block);
      }

      for (const nestedChild of Array.from(child.children)) {
        const nestedTag = nestedChild.tagName.toLowerCase();
        if (nestedTag === 'ul' || nestedTag === 'ol') {
          appendBlocksFromNode(nestedChild, blocks, level + 1);
        }
      }
    }
    return;
  }

  for (const child of Array.from(element.childNodes)) {
    appendBlocksFromNode(child, blocks, level);
  }
}

function htmlToPortableText(html: string): PortableTextBlockWithLists[] {
  const normalizedHtml = normalizeText(html);
  if (!normalizedHtml) {
    return [];
  }

  const dom = new JSDOM(`<body>${normalizedHtml}</body>`);
  const blocks: PortableTextBlockWithLists[] = [];

  for (const child of Array.from(dom.window.document.body.childNodes)) {
    appendBlocksFromNode(child, blocks, 1);
  }

  return blocks;
}

function parseMarkdownFrontmatter(mdContent: string) {
  let title = '';
  let metaDescription = '';
  let slug = '';
  let category = 'Career Guides'; // Default category
  
  const lines = mdContent.split('\n');
  let bodyLines = [];
  let inHeader = true;

  for (let line of lines) {
    if (inHeader) {
      if (line.trim() === '---') {
        inHeader = false;
        continue;
      }
      
      if (line.startsWith('# ')) {
        title = line.replace('# ', '').trim();
      } else if (line.includes('**Meta Title:**')) {
        // can extract if needed, but title is fine
      } else if (line.includes('**Meta Description:**')) {
        metaDescription = line.replace('**Meta Description:**', '').trim();
      } else if (line.includes('**Recommended URL Slug:**')) {
        slug = line.replace('**Recommended URL Slug:**', '').replace(/[\/\`]/g, '').trim();
      }
    } else {
      bodyLines.push(line);
    }
  }

  // Handle artifacts without `---`
  if (inHeader) {
    // If it didn't find `---`, then header logic wasn't fully separated. Re-parse purely line by line
    bodyLines = [];
    title = ''; slug = ''; metaDescription = '';
    
    let skipLine = false;
    for (let line of lines) {
      if (line.startsWith('# ')) {
        if (!title) title = line.replace('# ', '').trim();
        skipLine = true;
      } else if (line.includes('**Meta ')) {
        if (line.includes('Meta Description:**')) metaDescription = line.replace('**Meta Description:**', '').trim();
        skipLine = true;
      } else if (line.includes('**Recommended URL')) {
        slug = line.replace('**Recommended URL Slug:**', '').replace(/[\/\`]/g, '').trim();
        skipLine = true;
      } else if (line.includes('**Author:**') || line.includes('**Last Updated:**') || line.trim() === '---') {
        skipLine = true;
      } else {
        skipLine = false;
      }
      
      if (!skipLine) {
        bodyLines.push(line);
      }
    }
  }

  return { title, metaDescription, slug, category, body: bodyLines.join('\n') };
}

async function main() {
  const artifactsDir = path.resolve('C:/Users/Resham KC/.gemini/antigravity/brain/887ba207-efd4-476f-a9b1-1f69814058de/artifacts');
  const files = fs.readdirSync(artifactsDir).filter(f => f.endsWith('.md'));
  
  const articleDocs: SanityImportDocument[] = [];

  for (const file of files) {
    const mdContent = fs.readFileSync(path.join(artifactsDir, file), 'utf-8');
    const { title, metaDescription, slug, category, body } = parseMarkdownFrontmatter(mdContent);
    
    // Parse Markdown to HTML
    const htmlContent = marked.parse(body) as string;
    
    // Convert to PortableText
    const portableText = htmlToPortableText(htmlContent);

    const publishDate = new Date().toISOString();
    
    const docSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 96);
    
    const articleDoc: SanityImportDocument = {
      _id: `article.${docSlug}`,
      _type: 'article',
      title,
      slug: {
        _type: 'slug',
        current: docSlug,
      },
      excerpt: metaDescription || title,
      category,
      tags: [],
      status: 'published',
      publishDate,
      lastUpdatedDate: publishDate,
      author: 'Editorial Team',
      metaTitle: `${title} | theuaecareer.com`,
      metaDescription: metaDescription || title,
      content: portableText,
    };
    
    articleDocs.push(articleDoc);
  }

  console.log(`Pushing ${articleDocs.length} artifacts to Sanity...`);

  const batchSize = 20;

  for (let index = 0; index < articleDocs.length; index += batchSize) {
    const batch = articleDocs.slice(index, index + batchSize);
    let transaction = sanityClient.transaction();

    for (const document of batch) {
      transaction = transaction.createOrReplace(document);
    }

    await transaction.commit();
    console.log(`Imported ${Math.min(index + batch.length, articleDocs.length)} of ${articleDocs.length}`);
  }

  console.log('Sanity import finished successfully.');
}

main().catch((error) => {
  console.error('Sanity import failed.');
  console.error(error);
  process.exit(1);
});
