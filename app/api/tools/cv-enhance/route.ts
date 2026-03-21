import { NextRequest, NextResponse } from 'next/server';

function sentenceCase(value: string): string {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toBulletPoints(notes: string, title: string): string[] {
  const verbs = ['Delivered', 'Coordinated', 'Improved', 'Managed', 'Supported', 'Led'];
  const parts = notes
    .split(/\r?\n|[.;]/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return [
      `${verbs[0]} core responsibilities as a ${title || 'professional'} while maintaining quality and consistency.`,
      `${verbs[1]} day-to-day priorities with colleagues and stakeholders to keep work moving efficiently.`,
      `${verbs[2]} processes by staying organized, responsive, and focused on measurable outcomes.`,
    ];
  }

  return parts.slice(0, 3).map((part, index) => {
    const cleaned = part.replace(/^[-*]\s*/, '');
    const normalized = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
    return `${verbs[index % verbs.length]} ${normalized}.`;
  });
}

function buildSummary(title: string, skills: string[], bullets: string[]): string {
  const primarySkillText =
    skills.length > 0 ? ` with strengths in ${skills.slice(0, 3).join(', ')}` : '';
  const achievementText = bullets[0] ? ` Known for ${bullets[0].charAt(0).toLowerCase()}${bullets[0].slice(1)}` : '';

  return sentenceCase(
    `${title || 'Professional'} offering practical experience${primarySkillText}.${achievementText}`
  );
}

export async function POST(request: NextRequest) {
  try {
    const { title, notes, skills } = await request.json();

    if (!notes || typeof notes !== 'string') {
      return NextResponse.json({ error: 'Provide work notes to enhance.' }, { status: 400 });
    }

    const bullets = toBulletPoints(String(notes), String(title || 'Professional'));

    return NextResponse.json({
      bullets,
      summary: buildSummary(
        String(title || 'Professional'),
        Array.isArray(skills) ? skills.map((skill) => String(skill)) : [],
        bullets
      ),
    });
  } catch (error) {
    console.error('CV enhancement error:', error);
    return NextResponse.json({ error: 'Failed to enhance CV content.' }, { status: 500 });
  }
}
