import { NextRequest, NextResponse } from 'next/server';

type EnhanceMode = 'experience' | 'summary';

interface ExperienceContext {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  notes?: string;
  bullets?: string[];
}

interface EnhanceRequestBody {
  mode?: EnhanceMode;
  title?: string;
  notes?: string;
  skills?: string[];
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  experiences?: ExperienceContext[];
}

interface EnhanceResponseBody {
  bullets: string[];
  summary: string;
  provider: 'gemini' | 'fallback';
  model?: string;
  warning?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
  error?: {
    message?: string;
  };
}

const GEMINI_MODELS = ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'] as const;

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeSkillList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeExperiences(value: unknown): ExperienceContext[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const record = typeof item === 'object' && item !== null ? (item as Record<string, unknown>) : {};

      return {
        title: normalizeText(record.title),
        company: normalizeText(record.company),
        location: normalizeText(record.location),
        startDate: normalizeText(record.startDate),
        endDate: normalizeText(record.endDate),
        current: Boolean(record.current),
        notes: normalizeText(record.notes),
        bullets: Array.isArray(record.bullets)
          ? record.bullets.map((bullet) => normalizeText(bullet)).filter(Boolean).slice(0, 5)
          : [],
      };
    })
    .filter((item) => item.title || item.company || item.notes || item.bullets?.length);
}

function cleanSentence(value: string): string {
  const compact = value.replace(/\s+/g, ' ').replace(/^[-*]\s*/, '').trim();
  if (!compact) {
    return '';
  }

  const withCapital = compact.charAt(0).toUpperCase() + compact.slice(1);
  return /[.!?]$/.test(withCapital) ? withCapital : `${withCapital}.`;
}

function sentenceCase(value: string): string {
  const normalized = normalizeText(value);
  if (!normalized) {
    return '';
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function extractNoteFragments(notes: string): string[] {
  return notes
    .split(/\r?\n|[.;]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function buildFallbackBullets(notes: string, title: string): string[] {
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
    return cleanSentence(alreadyActionLed ? normalized : `${actionVerbs[index % actionVerbs.length]} ${lower}`);
  });
}

function buildFallbackSummary(title: string, skills: string[], bullets: string[]): string {
  const skillText = skills.length > 0 ? ` with strengths in ${skills.slice(0, 4).join(', ')}` : '';
  const achievement = bullets[0]
    ? ` Known for ${bullets[0].charAt(0).toLowerCase()}${bullets[0].slice(1)}`
    : '';

  return sentenceCase(
    `${title || 'Professional'} offering practical experience${skillText}.${achievement}`
  );
}

function buildFallbackResponse(body: EnhanceRequestBody, warning?: string): EnhanceResponseBody {
  const bullets = buildFallbackBullets(normalizeText(body.notes), normalizeText(body.title) || 'professional');

  return {
    bullets,
    summary: buildFallbackSummary(normalizeText(body.title), normalizeSkillList(body.skills), bullets),
    provider: 'fallback',
    warning,
  };
}

function isGeminiConfigured(): boolean {
  const apiKey = normalizeText(process.env.GEMINI_API_KEY);
  return Boolean(apiKey && apiKey !== 'your-gemini-api-key-here');
}

function buildExperienceContext(experiences: ExperienceContext[]): string {
  if (experiences.length === 0) {
    return 'No additional experience context was provided.';
  }

  return experiences
    .slice(0, 6)
    .map((experience, index) => {
      const headline = [experience.title, experience.company].filter(Boolean).join(' at ');
      const dates = [experience.startDate, experience.current ? 'Present' : experience.endDate]
        .filter(Boolean)
        .join(' - ');
      const notes = normalizeText(experience.notes);
      const bullets = experience.bullets?.length ? experience.bullets.join(' | ') : '';

      return [
        `${index + 1}. ${headline || 'Role'}${dates ? ` (${dates})` : ''}`,
        experience.location ? `Location: ${experience.location}` : '',
        notes ? `Raw notes: ${notes}` : '',
        bullets ? `Current bullets: ${bullets}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');
}

function buildPrompt(body: EnhanceRequestBody): string {
  const mode: EnhanceMode = body.mode === 'summary' ? 'summary' : 'experience';
  const title = normalizeText(body.title) || 'Professional';
  const skills = normalizeSkillList(body.skills);
  const notes = normalizeText(body.notes);
  const experiences = normalizeExperiences(body.experiences);
  const currentRoleLine = [
    normalizeText(body.title),
    normalizeText(body.company) ? `at ${normalizeText(body.company)}` : '',
    normalizeText(body.location) ? `in ${normalizeText(body.location)}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const dates = [normalizeText(body.startDate), body.current ? 'Present' : normalizeText(body.endDate)]
    .filter(Boolean)
    .join(' - ');

  return `
You are an expert GCC and UAE resume writer helping a job seeker turn rough notes into strong CV copy.

Write in clean, professional English for recruiters. Keep the output ATS-friendly and credible.

Hard rules:
- Never invent metrics, employers, dates, tools, certifications, or achievements.
- Use only facts that are already present in the raw input or context.
- Make the writing sharper, clearer, and more outcome-focused.
- Avoid first-person pronouns.
- Avoid vague filler like "hardworking", "dynamic", or "team player" unless directly supported.
- Bullet points should begin with strong action verbs.
- If the notes are messy, infer structure, not new facts.
- Keep bullet points concise enough to fit on a modern CV.

Return valid JSON only with this shape:
{
  "bullets": ["3 to 5 polished bullet points"],
  "summary": "A 2-3 sentence professional summary tailored to the target role."
}

Mode: ${mode}
Target role: ${title}
Core skills: ${skills.length > 0 ? skills.join(', ') : 'Not provided'}
Current role context: ${currentRoleLine || 'Not provided'}
Role dates: ${dates || 'Not provided'}

All experience context:
${buildExperienceContext(experiences)}

Raw notes to rewrite:
${notes}

Specific task:
${mode === 'summary'
    ? 'Use the full experience context and raw notes to produce the strongest possible CV summary. The bullets should reflect the strongest proven contributions from the raw notes and can be reused in the CV if helpful.'
    : 'Rewrite the raw notes into polished bullet points for this specific experience entry, then produce a summary that fits the overall target role.'}
`.trim();
}

function parseGeminiText(payload: GeminiResponse): string {
  const blockReason = payload.promptFeedback?.blockReason;
  if (blockReason) {
    throw new Error(`Gemini blocked the request: ${blockReason}`);
  }

  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
  if (!text) {
    throw new Error(payload.error?.message || 'Gemini returned an empty response.');
  }

  return text;
}

function parseEnhancementResponse(raw: string): Pick<EnhanceResponseBody, 'bullets' | 'summary'> {
  const stripped = raw.replace(/```json|```/gi, '').trim();
  const parsed = JSON.parse(stripped) as { bullets?: unknown; summary?: unknown };

  const bullets = Array.isArray(parsed.bullets)
    ? parsed.bullets.map((item) => cleanSentence(String(item))).filter(Boolean).slice(0, 5)
    : [];
  const summary = sentenceCase(String(parsed.summary || ''));

  if (!summary) {
    throw new Error('Missing summary in Gemini response.');
  }

  if (bullets.length === 0) {
    throw new Error('Missing bullet points in Gemini response.');
  }

  return { bullets, summary };
}

async function generateWithGemini(body: EnhanceRequestBody): Promise<EnhanceResponseBody> {
  const apiKey = normalizeText(process.env.GEMINI_API_KEY);
  let lastError: Error | null = null;

  for (const model of GEMINI_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: buildPrompt(body) }],
              },
            ],
            generationConfig: {
              temperature: 0.55,
              topP: 0.9,
              maxOutputTokens: 900,
              responseMimeType: 'application/json',
              responseJsonSchema: {
                type: 'object',
                properties: {
                  bullets: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  summary: {
                    type: 'string',
                  },
                },
                required: ['bullets', 'summary'],
              },
            },
          }),
        }
      );

      const payload = (await response.json()) as GeminiResponse;

      if (!response.ok) {
        const message = payload.error?.message || `Gemini request failed with status ${response.status}.`;
        throw new Error(message);
      }

      const text = parseGeminiText(payload);
      const parsed = parseEnhancementResponse(text);

      return {
        ...parsed,
        provider: 'gemini',
        model,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown Gemini error.');
    }
  }

  throw lastError || new Error('Gemini request failed.');
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnhanceRequestBody;
    const notes = normalizeText(body.notes);

    if (!notes) {
      return NextResponse.json({ error: 'Provide raw work notes to enhance.' }, { status: 400 });
    }

    if (notes.length > 8000) {
      return NextResponse.json(
        { error: 'Raw input is too long. Keep the notes under 8,000 characters.' },
        { status: 400 }
      );
    }

    if (!isGeminiConfigured()) {
      return NextResponse.json(
        buildFallbackResponse(
          body,
          'Gemini is not configured yet. Add a real GEMINI_API_KEY to enable full AI writing.'
        )
      );
    }

    try {
      const result = await generateWithGemini(body);
      return NextResponse.json(result);
    } catch (error) {
      console.error('Gemini CV enhancement failed, using fallback:', error);
      return NextResponse.json(
        buildFallbackResponse(
          body,
          'Gemini was unavailable, so a basic rewrite was used instead.'
        )
      );
    }
  } catch (error) {
    console.error('CV enhancement error:', error);
    return NextResponse.json({ error: 'Failed to enhance CV content.' }, { status: 500 });
  }
}
