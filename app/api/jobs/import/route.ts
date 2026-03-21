import { Readable } from 'stream';
import csv from 'csv-parser';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromCookies } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Job from '@/lib/models/Job';

function mapCategory(value: string): string {
  const lower = value.toLowerCase();

  if (lower.includes('hospitality') || lower.includes('f&b') || lower.includes('hotel')) return 'Hospitality';
  if (lower.includes('it') || lower.includes('tech') || lower.includes('information')) return 'IT';
  if (lower.includes('construction')) return 'Construction';
  if (lower.includes('health')) return 'Healthcare';
  if (lower.includes('sale') || lower.includes('customer')) return 'Sales';
  if (lower.includes('logistics') || lower.includes('warehouse') || lower.includes('transport')) return 'Logistics';
  if (lower.includes('admin') || lower.includes('office')) return 'Admin';
  if (lower.includes('finance') || lower.includes('account')) return 'Finance';
  if (lower.includes('education')) return 'Education';
  if (lower.includes('engineer')) return 'Engineering';
  if (lower.includes('retail') || lower.includes('fmcg')) return 'Retail';

  return 'Other';
}

function mapJobType(value: string): 'Full-time' | 'Part-time' | 'Walk-in' | 'Contract' {
  const normalized = value.trim().toLowerCase();

  if (normalized === 'part-time') return 'Part-time';
  if (normalized === 'walk-in') return 'Walk-in';
  if (normalized === 'contract') return 'Contract';
  return 'Full-time';
}

function parseBoolean(value: string): boolean {
  return ['true', '1', 'yes', 'y'].includes(value.trim().toLowerCase());
}

function parseNumber(value: string): number | undefined {
  const sanitized = value.replace(/,/g, '').trim();
  if (!sanitized) {
    return undefined;
  }

  const parsed = Number(sanitized);
  return Number.isNaN(parsed) ? undefined : parsed;
}

async function parseCsv(text: string): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const rows: Record<string, string>[] = [];

    Readable.from([text])
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Attach a CSV file to import.' }, { status: 400 });
    }

    const text = await file.text();
    const rows = await parseCsv(text);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'The CSV file did not contain any rows.' }, { status: 400 });
    }

    await dbConnect();

    let imported = 0;
    const errors: string[] = [];

    for (const [index, row] of rows.entries()) {
      try {
        const isWalkIn = parseBoolean(row.isWalkIn || '');
        const expiryDate =
          row.expiryDate && row.expiryDate.trim()
            ? new Date(row.expiryDate)
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await Job.create({
          title: row.title?.trim(),
          companyName: row.companyName?.trim() || '',
          location: {
            city: row.city?.trim() || 'Dubai',
            country: row.country?.trim() || 'UAE',
          },
          jobType: mapJobType(row.jobType || ''),
          salaryRange:
            parseNumber(row.salaryMin || '') || parseNumber(row.salaryMax || '')
              ? {
                  min: parseNumber(row.salaryMin || ''),
                  max: parseNumber(row.salaryMax || ''),
                  currency: (row.currency || 'AED').trim() || 'AED',
                }
              : undefined,
          experienceRequired: row.experienceRequired?.trim() || '',
          category: mapCategory(row.category || ''),
          description: row.description?.trim(),
          howToApply: row.howToApply?.trim(),
          expiryDate,
          isWalkIn,
          walkInDetails: isWalkIn
            ? {
                date: row.walkInDate?.trim() ? new Date(row.walkInDate) : undefined,
                time: row.walkInTime?.trim() || '',
                venue: row.walkInVenue?.trim() || '',
              }
            : undefined,
          status: parseBoolean(row.expired || '') ? 'expired' : 'active',
        });

        imported += 1;
      } catch (error) {
        errors.push(
          `Row ${index + 2}: ${error instanceof Error ? error.message : 'Failed to import'}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      failed: errors.length,
      errors,
    });
  } catch (error) {
    console.error('CSV import error:', error);
    return NextResponse.json({ error: 'Failed to import CSV file.' }, { status: 500 });
  }
}
