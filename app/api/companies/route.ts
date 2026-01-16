import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import CompanyModel from '@/lib/db/models/Company';
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
    const industry = searchParams.get('industry');
    const search = searchParams.get('search');

    const query: any = {};
    if (industry) query.industry = industry;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      CompanyModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      CompanyModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        companies,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get companies error:', error);
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
    const { name, industry, size, location, description, website } = body;

    if (!name || !industry || !size || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const company = await CompanyModel.create({
      name,
      industry,
      size,
      location,
      description,
      website,
    });

    return NextResponse.json(
      {
        success: true,
        data: company,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create company error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
