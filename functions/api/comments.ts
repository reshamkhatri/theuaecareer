import { articles as launchArticles } from '../../lib/launch-content';

interface Env {
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
  NEXT_PUBLIC_SANITY_DATASET?: string;
  NEXT_PUBLIC_SANITY_API_VERSION?: string;
  SANITY_API_WRITE_TOKEN?: string;
  COMMENTS_AUTO_APPROVE?: string;
}

interface CommentPayload {
  action?: unknown;
  articleSlug?: unknown;
  articleTitle?: unknown;
  commentId?: unknown;
  parentCommentId?: unknown;
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

function buildQueryUrl(env: Env, query: string, params: Record<string, string> = {}) {
  const { projectId, dataset, apiVersion } = getSanityConfig(env);
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  return url.toString();
}

async function runQuery<T>(env: Env, query: string, params: Record<string, string> = {}) {
  const response = await fetch(buildQueryUrl(env, query, params));

  if (!response.ok) {
    throw new Error('Failed to query comments.');
  }

  const data = (await response.json()) as { result?: T };
  return data.result;
}

async function fetchApprovedComments(env: Env, slug: string) {
  const query = `*[_type == "comment" && articleSlug == $slug && status == "approved"] | order(submittedAt asc) {
    _id,
    articleSlug,
    articleTitle,
    authorName,
    message,
    submittedAt,
    parentCommentId,
    likeCount,
    status
  }`;

  const result = await runQuery<unknown[]>(env, query, { slug });
  return Array.isArray(result) ? result : [];
}

async function articleExists(env: Env, slug: string) {
  if (launchArticles.some((article) => cleanString(article.slug, 120) === slug)) {
    return true;
  }

  const result = await runQuery<number>(
    env,
    `count(*[_type == "article" && slug.current == $slug])`,
    { slug }
  );

  return typeof result === 'number' && result > 0;
}

async function commentExists(env: Env, commentId: string, articleSlug: string) {
  const result = await runQuery<number>(
    env,
    `count(*[_type == "comment" && _id == $commentId && articleSlug == $articleSlug])`,
    { commentId, articleSlug }
  );

  return typeof result === 'number' && result > 0;
}

async function getCommentLikeCount(env: Env, commentId: string) {
  const result = await runQuery<number>(
    env,
    `coalesce(*[_type == "comment" && _id == $commentId][0].likeCount, 0)`,
    { commentId }
  );

  return typeof result === 'number' ? result : 0;
}

async function mutateSanity(env: Env, mutations: unknown[]) {
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
      body: JSON.stringify({ mutations }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to save the comment.');
  }

  return (await response.json()) as {
    results?: Array<{ id?: string }>;
  };
}

async function createComment(env: Env, document: Record<string, unknown>) {
  const result = await mutateSanity(env, [{ create: document }]);
  return result.results?.[0]?.id || `temp-${Date.now()}`;
}

async function incrementLike(env: Env, commentId: string) {
  await mutateSanity(env, [
    {
      patch: {
        id: commentId,
        setIfMissing: { likeCount: 0 },
        inc: { likeCount: 1 },
      },
    },
  ]);

  return getCommentLikeCount(env, commentId);
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
          'Cache-Control': 'no-store',
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
    const action = cleanString(payload.action, 20);

    if (action === 'like') {
      const commentId = cleanString(payload.commentId, 128);

      if (!commentId) {
        return jsonResponse({ message: 'Missing comment ID.' }, { status: 400 });
      }

      const likeCount = await incrementLike(context.env, commentId);
      return jsonResponse({ message: 'Thanks for the feedback.', likeCount }, { status: 200 });
    }

    const articleSlug = cleanString(payload.articleSlug, 120);
    const articleTitle = cleanString(payload.articleTitle, 160);
    const parentCommentId = cleanString(payload.parentCommentId, 128);
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

    if (!articleSlug || !articleTitle || !authorName) {
      return jsonResponse({ message: 'Please complete the required comment fields.' }, { status: 400 });
    }

    if (message.length < 2) {
      return jsonResponse({ message: 'Write at least 2 characters in your comment or reply.' }, { status: 400 });
    }

    if (authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return jsonResponse({ message: 'Enter a valid email address or leave it blank.' }, { status: 400 });
    }

    const exists = await articleExists(context.env, articleSlug);
    if (!exists) {
      return jsonResponse({ message: 'That article could not be verified.' }, { status: 400 });
    }

    if (parentCommentId) {
      const parentExists = await commentExists(context.env, parentCommentId, articleSlug);

      if (!parentExists) {
        return jsonResponse({ message: 'That reply target could not be verified.' }, { status: 400 });
      }
    }

    const status = context.env.COMMENTS_AUTO_APPROVE === 'true' ? 'approved' : 'pending';
    const submittedAt = new Date().toISOString();
    const commentId = await createComment(context.env, {
      _type: 'comment',
      articleSlug,
      articleTitle,
      articlePath: `/blog/${articleSlug}`,
      authorName,
      message,
      parentCommentId: parentCommentId || undefined,
      likeCount: 0,
      status,
      submittedAt,
      ...(sourceUrl ? { sourceUrl } : {}),
    });

    return jsonResponse(
      {
        message:
          status === 'approved'
            ? parentCommentId
              ? 'Thanks. Your reply is live now.'
              : 'Thanks. Your comment is live now.'
            : parentCommentId
              ? 'Thanks. Your reply was submitted and will appear after moderation.'
              : 'Thanks. Your comment was submitted and will appear after moderation.',
        comment:
          status === 'approved'
            ? {
                _id: commentId,
                articleSlug,
                articleTitle,
                authorName,
                message,
                submittedAt,
                parentCommentId: parentCommentId || undefined,
                likeCount: 0,
                status,
              }
            : undefined,
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
