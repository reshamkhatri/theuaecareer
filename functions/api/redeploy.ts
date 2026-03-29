interface Env {
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
  SANITY_WEBHOOK_SECRET?: string;
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

function unauthorized() {
  return jsonResponse({ message: 'Unauthorized.' }, { status: 401 });
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get('authorization')?.trim();

  if (!authorization?.toLowerCase().startsWith('bearer ')) {
    return '';
  }

  return authorization.slice(7).trim();
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const webhookSecret = context.env.SANITY_WEBHOOK_SECRET?.trim();
  const deployHookUrl = context.env.CLOUDFLARE_DEPLOY_HOOK_URL?.trim();

  if (!webhookSecret || !deployHookUrl) {
    return jsonResponse(
      { message: 'Deploy automation is not fully configured.' },
      { status: 500 }
    );
  }

  if (getBearerToken(context.request) !== webhookSecret) {
    return unauthorized();
  }

  try {
    const deployResponse = await fetch(deployHookUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'theuaecareer-sanity-webhook',
      },
    });

    if (!deployResponse.ok) {
      return jsonResponse(
        {
          message: 'Cloudflare deploy hook failed.',
          status: deployResponse.status,
        },
        { status: 502 }
      );
    }

    return jsonResponse(
      { message: 'Cloudflare deployment triggered successfully.' },
      { status: 202 }
    );
  } catch (error) {
    return jsonResponse(
      {
        message: error instanceof Error ? error.message : 'Failed to trigger deployment.',
      },
      { status: 500 }
    );
  }
}

export async function onRequestGet() {
  return jsonResponse(
    { message: 'Use POST to trigger a Cloudflare redeploy from Sanity.' },
    { status: 405 }
  );
}
