# Sanity -> Cloudflare Auto Deploy Setup

This makes the workflow:

1. publish article or job in Sanity
2. Sanity sends a webhook to your site
3. your site triggers the Cloudflare Pages deploy hook
4. Cloudflare rebuilds automatically

---

## 1. Add Cloudflare environment variables

In your Cloudflare Pages project, add these production variables:

```env
CLOUDFLARE_DEPLOY_HOOK_URL=
SANITY_WEBHOOK_SECRET=
```

### What they are

- `CLOUDFLARE_DEPLOY_HOOK_URL`
  The deploy hook URL generated inside your Cloudflare Pages project.

- `SANITY_WEBHOOK_SECRET`
  Any long random secret string you choose.

Example secret:

```txt
uaecareer-sanity-webhook-2026-long-random-secret
```

After adding them, redeploy once so the new `/api/redeploy` function can use them.

---

## 2. Create the Cloudflare deploy hook

Cloudflare docs: [Deploy Hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/)

In Cloudflare:

1. Open `Workers & Pages`
2. Open your project `theuaecareer`
3. Go to `Settings`
4. Go to `Builds`
5. Click `Add deploy hook`
6. Use:
   - Name: `sanity-production`
   - Branch: `master`
7. Copy the generated URL
8. Paste that URL into:

```env
CLOUDFLARE_DEPLOY_HOOK_URL=...
```

---

## 3. Create the Sanity webhook

Sanity docs: [GROQ-powered webhooks](https://www.sanity.io/docs/content-lake/webhooks)

In Sanity Manage:

1. Open your project
2. Go to `API`
3. Open `Webhooks`
4. Click `Create webhook`

Use these values:

- Name: `cloudflare-pages-redeploy`
- URL: `https://theuaecareer.com/api/redeploy`
- Method: `POST`
- Dataset: `production`
- Trigger on:
  - `Create`
  - `Update`
  - `Delete`

### Filter

Use this filter:

```groq
_type in ["article", "job", "siteSettings"]
```

### Projection

This can stay simple:

```groq
{
  "_id": _id,
  "_type": _type,
  "slug": slug.current
}
```

### Header

Add this custom header:

```txt
Authorization: Bearer YOUR_SANITY_WEBHOOK_SECRET
```

Replace `YOUR_SANITY_WEBHOOK_SECRET` with the exact same value you used in Cloudflare for `SANITY_WEBHOOK_SECRET`.

Save the webhook.

---

## 4. Test it

1. Open `https://theuaecareer.com/studio/`
2. Edit one article title slightly
3. Publish it
4. Go to Cloudflare Pages -> `Deployments`
5. Confirm a new deployment starts automatically

If it works:
- you no longer need to manually redeploy after every Sanity publish

---

## 5. Troubleshooting

### If publishing does nothing

Check:

1. Cloudflare env vars are saved in `Production`
2. You redeployed once after adding them
3. The Sanity webhook URL is exactly:

```txt
https://theuaecareer.com/api/redeploy
```

4. The Authorization header secret matches exactly
5. The Cloudflare deploy hook URL is correct

### If `/api/redeploy` returns unauthorized

The `Authorization: Bearer ...` header in Sanity does not match `SANITY_WEBHOOK_SECRET` in Cloudflare.

### If `/api/redeploy` returns 500

One of these env vars is missing:

- `CLOUDFLARE_DEPLOY_HOOK_URL`
- `SANITY_WEBHOOK_SECRET`

### If `/api/redeploy` returns 502

Cloudflare received the webhook, but the deploy hook call failed. Recheck the deploy hook URL and regenerate it if needed.

---

## 6. What is already coded

The redeploy endpoint is already added here:

- [redeploy.ts](D:/theuaecareer/frontend/functions/api/redeploy.ts)

That endpoint:

- only accepts `POST`
- checks the bearer secret
- triggers your Cloudflare Pages deploy hook

---

## 7. Publishing workflow after setup

After this is configured, your workflow becomes:

1. write or edit in Sanity
2. click publish
3. wait for Cloudflare build to finish
4. check the live site
