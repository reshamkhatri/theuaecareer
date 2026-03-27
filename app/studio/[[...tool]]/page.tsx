/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// NOTE: This route does NOT work with static export (output: 'export')
// To use Sanity Studio with static sites, run it separately:
// npm run sanity:dev → http://localhost:3333
// Or deploy to Sanity hosting: npm run sanity:deploy

export const dynamic = 'force-static'
export const dynamicParams = false

export { metadata, viewport } from 'next-sanity/studio'

export function generateStaticParams() {
  return [{ tool: [] }]
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
