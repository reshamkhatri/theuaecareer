import { NextRequest, NextResponse } from 'next/server';
import Job from '@/lib/models/Job';
import { getAuthFromCookies } from '@/lib/auth';
import { getJobs } from '@/lib/content';

// GET /api/jobs — Public job listing with search, filters, pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const jobType = searchParams.get('jobType') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') === 'walk-in' ? 'walk-in' : 'recent';
    const walkIn = searchParams.get('walkIn') === 'true';
    const includeExpired = searchParams.get('includeExpired') === 'true';

    const result = await getJobs({
      page,
      limit,
      search,
      country,
      jobType,
      category,
      walkIn,
      includeExpired,
      sort,
    });

    return NextResponse.json({
      jobs: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST /api/jobs — Admin: create a new job
export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { default: dbConnect } = await import('@/lib/mongodb');
    await dbConnect();
    const body = await request.json();

    const job = new Job(body);
    await job.save();

    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
