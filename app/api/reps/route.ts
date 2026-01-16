import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import RepModel from '@/lib/db/models/Rep';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const availability = searchParams.get('availability');

    const query: any = {};
    if (availability) query.availability = availability;

    const skip = (page - 1) * limit;

    const [reps, total] = await Promise.all([
      RepModel.find(query).sort({ rating: -1 }).skip(skip).limit(limit).lean(),
      RepModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        reps,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get reps error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { userId, skills, experience, availability } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
    }

    const existingRep = await RepModel.findOne({ userId });
    if (existingRep) {
      return NextResponse.json(
        { success: false, error: 'Rep profile already exists for this user' },
        { status: 409 }
      );
    }

    const rep = await RepModel.create({
      userId,
      skills: skills || [],
      experience: experience || 0,
      availability: availability || 'available',
      rating: 0,
      completedGigs: 0,
    });

    return NextResponse.json(
      {
        success: true,
        data: rep,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create rep error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
