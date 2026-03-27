export interface CVAssistExperienceInput {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  notes?: string;
  bullets?: string[];
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function cleanSentence(value: string): string {
  const compact = value.replace(/\s+/g, ' ').replace(/^[-*]\s*/, '').trim();
  if (!compact) {
    return '';
  }

  const withCapital = compact.charAt(0).toUpperCase() + compact.slice(1);
  return /[.!?]$/.test(withCapital) ? withCapital : `${withCapital}.`;
}

function extractNoteFragments(notes: string): string[] {
  return notes
    .split(/\r?\n|[.;]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function buildCvBullets(notes: string, title: string): string[] {
  const actionVerbs = ['Led', 'Improved', 'Coordinated', 'Managed', 'Delivered', 'Supported'];
  const fragments = extractNoteFragments(notes);

  if (fragments.length === 0) {
    return [
      `Delivered strong day-to-day execution as a ${title || 'professional'} while maintaining quality and consistency.`,
      'Coordinated priorities with teammates and stakeholders to keep work moving smoothly.',
      'Improved workflows by staying organized, responsive, and focused on practical results.',
    ];
  }

  return fragments.slice(0, 4).map((fragment, index) => {
    const normalized = fragment.replace(/^[-*]\s*/, '').trim();
    const lower = normalized.charAt(0).toLowerCase() + normalized.slice(1);
    const alreadyActionLed = /^(led|managed|improved|coordinated|delivered|supported|handled|built|created|trained|maintained|oversaw)\b/i.test(
      normalized
    );

    return cleanSentence(
      alreadyActionLed ? normalized : `${actionVerbs[index % actionVerbs.length]} ${lower}`
    );
  });
}

function buildSkillText(skills: string[]): string {
  const filteredSkills = skills.map((skill) => normalizeText(skill)).filter(Boolean).slice(0, 4);
  return filteredSkills.length > 0 ? ` with strengths in ${filteredSkills.join(', ')}` : '';
}

function getPrimaryHighlight(experiences: CVAssistExperienceInput[]): string {
  const noteSource = experiences
    .flatMap((experience) => {
      const noteText = normalizeText(experience.notes);
      if (noteText) {
        return extractNoteFragments(noteText);
      }

      return Array.isArray(experience.bullets)
        ? experience.bullets.map((bullet) => normalizeText(bullet)).filter(Boolean)
        : [];
    })
    .find(Boolean);

  if (!noteSource) {
    return '';
  }

  return cleanSentence(noteSource);
}

export function buildCvSummary(options: {
  title: string;
  skills: string[];
  experiences: CVAssistExperienceInput[];
}): string {
  const title = normalizeText(options.title) || 'Professional';
  const skillText = buildSkillText(options.skills);
  const highlight = getPrimaryHighlight(options.experiences);
  const roleCount = options.experiences.filter((experience) => experience.title || experience.company).length;
  const scopeText = roleCount > 1 ? ` across ${roleCount} recent roles` : '';

  if (!highlight) {
    return `${title} with a strong Gulf-ready profile${skillText}, focused on clear communication, dependable execution, and practical results.`;
  }

  const achievement = highlight.charAt(0).toLowerCase() + highlight.slice(1);
  return `${title}${scopeText}${skillText}. Known for ${achievement}`;
}
