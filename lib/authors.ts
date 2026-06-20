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
    bio: 'Resham KC is a full-stack developer and career analyst who has worked in and around the Gulf job market for over a decade. He has personally navigated UAE visa and employment processes, reviewed hundreds of CVs for job seekers, and tracked how Gulf hiring actually works on the ground. He founded theuaecareer.com to turn that first-hand experience into a practical, no-nonsense resource for job seekers across the UAE, Saudi Arabia, and Qatar.',
    avatar: '/authors/resham-kc.png',
    portfolio: 'https://rxm.ae',
  },
  'Nishan KC': {
    name: 'Nishan KC',
    slug: 'nishan-kc',
    role: 'Co-Founder & Career Researcher',
    bio: 'Nishan KC is a career researcher and content strategist who has spent years studying how expats find work in the Gulf. He follows MOHRE and free-zone hiring rules closely and verifies every process described on theuaecareer.com against official UAE sources. He leads the site\'s editorial direction so each guide reflects real, current conditions rather than recycled advice.',
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
