import { NextRequest, NextResponse } from 'next/server';
import Article from '@/lib/models/Article';
import { getAuthFromCookies } from '@/lib/auth';
import { getArticles } from '@/lib/content';

// GET /api/articles — Public article listing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '20');
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'published';

    const result = await getArticles({
      page,
      limit,
      category,
      search,
      status: status as 'draft' | 'published' | 'archived',
    });

    return NextResponse.json({
      articles: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST /api/articles — Admin: create article
export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { default: dbConnect } = await import('@/lib/mongodb');
    await dbConnect();
    const body = await request.json();

    const article = new Article(body);
    await article.save();

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
