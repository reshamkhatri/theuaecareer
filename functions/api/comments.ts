interface Env {
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
  NEXT_PUBLIC_SANITY_DATASET?: string;
  NEXT_PUBLIC_SANITY_API_VERSION?: string;
  SANITY_API_WRITE_TOKEN?: string;
  COMMENTS_AUTO_APPROVE?: string;
}

interface CommentPayload {
  articleSlug?: unknown;
  articleTitle?: unknown;
  authorName?: unknown;
  authorEmail?: unknown;
  message?: unknown;
  website?: unknown;
  sourceUrl?: unknown;
}

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init.headers,
    },
  });
}

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\u0000/g, '').trim().slice(0, maxLength);
}

function cleanMessage(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\u0000/g, '').trim().slice(0, 2000);
}

function getSanityConfig(env: Env) {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
  const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2026-03-27';

  if (!projectId) {
    throw new Error('Sanity project configuration is missing.');
  }

  return { projectId, dataset, apiVersion };
}

function buildQueryUrl(env: Env, query: string, params: Record<string, string>) {
  const { projectId, dataset, apiVersion } = getSanityConfig(env);
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  return url.toString();
}

async function fetchApprovedComments(env: Env, slug: string) {
  const query = `*[_type == "comment" && articleSlug == $slug && status == "approved"] | order(submittedAt asc) {
    _id,
    articleSlug,
    articleTitle,
    authorName,
    message,
    submittedAt,
    status
  }`;

  const response = await fetch(buildQueryUrl(env, query, { slug }));

  if (!response.ok) {
    throw new Error('Failed to load comments.');
  }

  const data = (await response.json()) as {
    result?: unknown[];
  };

  return Array.isArray(data.result) ? data.result : [];
}

async function articleExists(env: Env, slug: string) {
  const query = `count(*[_type == "article" && slug.current == $slug])`;
  const response = await fetch(buildQueryUrl(env, query, { slug }));

  if (!response.ok) {
    throw new Error('Failed to verify the article.');
  }

  const data = (await response.json()) as { result?: number };
  return typeof data.result === 'number' && data.result > 0;
}

async function createComment(env: Env, document: Record<string, unknown>) {
  const token = env.SANITY_API_WRITE_TOKEN?.trim();

  if (!token) {
    throw new Error('Comment submission is not configured.');
  }

  const { projectId, dataset, apiVersion } = getSanityConfig(env);
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            create: document,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to save the comment.');
  }
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const url = new URL(context.request.url);
  const slug = cleanString(url.searchParams.get('slug'), 120);

  if (!slug) {
    return jsonResponse({ message: 'Missing article slug.' }, { status: 400 });
  }

  try {
    const comments = await fetchApprovedComments(context.env, slug);
    return jsonResponse(
      { comments },
      {
        headers: {
          ...jsonHeaders,
          'Cache-Control': 'public, max-age=60, s-maxage=300',
        },
      }
    );
  } catch (error) {
    return jsonResponse(
      { message: error instanceof Error ? error.message : 'Failed to load comments.' },
      { status: 500 }
    );
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const payload = (await context.request.json()) as CommentPayload;
    const articleSlug = cleanString(payload.articleSlug, 120);
    const articleTitle = cleanString(payload.articleTitle, 160);
    const authorName = cleanString(payload.authorName, 80);
    const authorEmail = cleanString(payload.authorEmail, 120);
    const message = cleanMessage(payload.message);
    const website = cleanString(payload.website, 120);
    const sourceUrl = cleanString(payload.sourceUrl, 180);

    if (website) {
      return jsonResponse(
        { message: 'Thanks. Your comment was submitted and will appear after moderation.' },
        { status: 202 }
      );
    }

    if (!articleSlug || !articleTitle || !authorName || message.length < 8) {
      return jsonResponse({ message: 'Please complete the required comment fields.' }, { status: 400 });
    }

    if (authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return jsonResponse({ message: 'Enter a valid email address or leave it blank.' }, { status: 400 });
    }

    const exists = await articleExists(context.env, articleSlug);
    if (!exists) {
      return jsonResponse({ message: 'That article could not be verified.' }, { status: 400 });
    }

    const status = context.env.COMMENTS_AUTO_APPROVE === 'true' ? 'approved' : 'pending';

    await createComment(context.env, {
      _type: 'comment',
      articleSlug,
      articleTitle,
      articlePath: `/blog/${articleSlug}`,
      authorName,
      message,
      status,
      submittedAt: new Date().toISOString(),
      ...(sourceUrl ? { sourceUrl } : {}),
    });

    return jsonResponse(
      {
        message:
          status === 'approved'
            ? 'Thanks. Your comment is live now.'
            : 'Thanks. Your comment was submitted and will appear after moderation.',
      },
      { status: 201 }
    );
  } catch (error) {
    return jsonResponse(
      { message: error instanceof Error ? error.message : 'Failed to submit the comment.' },
      { status: 500 }
    );
  }
}
