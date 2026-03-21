import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import { signToken } from '@/lib/auth';

function createLoginResponse(adminId: string, email: string) {
  const token = signToken({ adminId, email });

  const response = NextResponse.json({
    success: true,
    admin: { email },
  });

  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}

function isLocalEnvAdmin(email: string, password: string): boolean {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  return Boolean(
    configuredEmail &&
      configuredPassword &&
      email === configuredEmail &&
      password === configuredPassword
  );
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (!normalizedEmail || !normalizedPassword) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (isLocalEnvAdmin(normalizedEmail, normalizedPassword)) {
      return createLoginResponse('env-admin', normalizedEmail);
    }

    await dbConnect();

    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await admin.comparePassword(normalizedPassword);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return createLoginResponse(admin._id.toString(), admin.email);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : 'Admin login is unavailable because the database is offline. Start MongoDB, or use the configured ADMIN_EMAIL and ADMIN_PASSWORD for local access.',
      },
      { status: process.env.NODE_ENV === 'production' ? 500 : 503 }
    );
  }
}
