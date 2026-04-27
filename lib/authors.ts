export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  portfolio?: string;
}

export const AUTHORS: Record<string, Author> = {
  'Resham KC': {
    name: 'Resham KC',
    slug: 'resham-kc',
    role: 'Co-Founder & Developer',
    bio: 'Resham KC is a full-stack developer and career analyst with first-hand experience navigating the Gulf job market. He built theuaecareer.com to give expat job seekers a practical, no-nonsense resource for UAE, Saudi, and Qatar opportunities.',
    avatar: '/authors/resham-kc.png',
    portfolio: 'https://rxm.ae',
  },
  'Nishan KC': {
    name: 'Nishan KC',
    slug: 'nishan-kc',
    role: 'Co-Founder & Career Researcher',
    bio: 'Nishan KC is a career researcher and content strategist focused on the Gulf employment market. With direct knowledge of how expats navigate UAE hiring processes, he shapes the editorial direction of theuaecareer.com and ensures every guide reflects real on-the-ground experience.',
    avatar: '/authors/nishan-kc.webp',
  },
  'Editorial Team': {
    name: 'Editorial Team',
    slug: 'editorial-team',
    role: 'theuaecareer.com Editorial Team',
    bio: 'The theuaecareer.com editorial team is led by Resham KC and Nishan KC. All content is researched, written, and reviewed to reflect real conditions in the UAE, Saudi Arabia, and Qatar job markets.',
    avatar: '/authors/editorial-team.webp',
  },
};

export function getAuthor(name: string): Author {
  return (
    AUTHORS[name] ||
    AUTHORS['Editorial Team']
  );
}
