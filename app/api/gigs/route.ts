import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import GigModel from '@/lib/db/models/Gig';
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
    const status = searchParams.get('status');

    const query: any = {};
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [gigs, total] = await Promise.all([
      GigModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      GigModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        gigs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get gigs error:', error);
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
    const { title, description, companyId, requirements, budget, duration } = body;

    if (!title || !description || !companyId || !budget || !duration) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const gig = await GigModel.create({
      title,
      description,
      companyId,
      requirements: requirements || [],
      budget,
      duration,
      status: 'draft',
    });

    return NextResponse.json(
      {
        success: true,
        data: gig,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create gig error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
