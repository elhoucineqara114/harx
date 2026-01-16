import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { userLoginSchema } from '@/lib/utils/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedData = userLoginSchema.parse(body)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: crypto.randomUUID(),
          email: validatedData.email,
          name: 'Sample User',
        },
        token: 'sample_jwt_token',
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTHENTICATION_FAILED',
          message: 'Invalid credentials',
        },
      },
      { status: 401 }
    )
  }
}
