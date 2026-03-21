import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/content';

export async function GET() {
  try {
    const result = await getJobs({
      walkIn: true,
      sort: 'walk-in',
      limit: 100,
    });

    return NextResponse.json({
      jobs: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching walk-in jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch walk-in jobs' }, { status: 500 });
  }
}
