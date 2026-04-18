/**
 * Lightweight HTML sanitizer for CMS content rendered via dangerouslySetInnerHTML.
 *
 * Strips script tags, event-handler attributes, javascript: hrefs, and other
 * common XSS vectors. Runs at build time (static export) so no runtime perf cost.
 */

const DANGEROUS_TAG_PATTERN =
  /<\s*\/?\s*(script|iframe|object|embed|applet|form|input|textarea|select|button|meta|link|base|style)\b[^>]*>/gi;

const EVENT_HANDLER_PATTERN = /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

const JAVASCRIPT_HREF_PATTERN = /\s+href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi;

const DATA_HREF_PATTERN = /\s+href\s*=\s*(?:"data:[^"]*"|'data:[^']*')/gi;

const SRCDOC_PATTERN = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

export function sanitizeHtml(html: string): string {
  return html
    .replace(DANGEROUS_TAG_PATTERN, '')
    .replace(EVENT_HANDLER_PATTERN, '')
    .replace(JAVASCRIPT_HREF_PATTERN, '')
    .replace(DATA_HREF_PATTERN, '')
    .replace(SRCDOC_PATTERN, '');
}
