import { NextResponse } from 'next/server';
import { getAuthFromCookies } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAuthFromCookies();

    if (!admin) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: { email: admin.email, adminId: admin.adminId },
    });
  } catch {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
}
