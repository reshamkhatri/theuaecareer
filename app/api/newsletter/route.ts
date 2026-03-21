import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/lib/models/Subscriber';
import { getAuthFromCookies } from '@/lib/auth';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  try {
    const admin = await getAuthFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).limit(500).lean();

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('Subscriber list error:', error);
    return NextResponse.json({ error: 'Failed to load subscribers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    await dbConnect();

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingSubscriber = await Subscriber.findOne({ email: normalizedEmail }).lean();

    if (existingSubscriber) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed.',
      });
    }

    await Subscriber.create({
      email: normalizedEmail,
      source: String(source || 'site').trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing. You will hear from us soon.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe right now.' }, { status: 500 });
  }
}
