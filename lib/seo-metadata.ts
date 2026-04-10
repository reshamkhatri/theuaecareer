const BRAND_SUFFIX_PATTERN = /\s*\|\s*theuaecareer(?:\.com)?\s*$/i;
const TITLE_SEPARATORS = [' | ', ' - ', ': '];

function normalizeDescription(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function trimToWordBoundary(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  const sliced = value.slice(0, maxLength);
  const boundary = sliced.lastIndexOf(' ');

  if (boundary >= Math.floor(maxLength * 0.6)) {
    return sliced.slice(0, boundary).trim();
  }

  return sliced.trim();
}

export function stripBrandSuffix(value: string): string {
  let title = value.replace(/\s+/g, ' ').trim();

  while (BRAND_SUFFIX_PATTERN.test(title)) {
    title = title.replace(BRAND_SUFFIX_PATTERN, '').trim();
  }

  return title;
}

export function buildSeoTitle(value: string, maxLength = 60): string {
  const cleanTitle = stripBrandSuffix(value);

  if (cleanTitle.length <= maxLength) {
    return cleanTitle;
  }

  for (const separator of TITLE_SEPARATORS) {
    const [firstSegment] = cleanTitle.split(separator);
    if (firstSegment && firstSegment.length >= 24 && firstSegment.length <= maxLength) {
      return firstSegment.trim();
    }
  }

  const words = cleanTitle.split(' ');
  let output = '';

  for (const word of words) {
    const candidate = output ? `${output} ${word}` : word;
    if (candidate.length > maxLength) {
      break;
    }
    output = candidate;
  }

  return output || cleanTitle.slice(0, maxLength).trim();
}

export function normalizeComparableTitle(value: string): string {
  return stripBrandSuffix(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function buildSeoDescription(
  primary: string | undefined,
  fallback: string,
  minLength = 140,
  maxLength = 160
): string {
  const base = normalizeDescription(primary || '');
  const supplement = normalizeDescription(fallback);
  const merged = [base, supplement]
    .filter(Boolean)
    .join(base && supplement && !base.endsWith('.') ? '. ' : ' ')
    .trim();

  const chosen = base.length >= minLength ? base : merged || supplement || base;
  return trimToWordBoundary(chosen, maxLength);
}

export function getPublicImagePath(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.startsWith('/') ? trimmed : undefined;
}
