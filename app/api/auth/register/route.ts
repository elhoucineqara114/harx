import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';
import UserModel from '@/lib/db/models/User';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, name, role = 'user' } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid password',
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
