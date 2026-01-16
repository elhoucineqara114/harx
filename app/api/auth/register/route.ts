import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { userRegistrationSchema } from '@/lib/utils/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedData = userRegistrationSchema.parse(body)

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: crypto.randomUUID(),
        email: validatedData.email,
        name: validatedData.name,
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
          code: 'INTERNAL_ERROR',
          message: 'Failed to register user',
        },
      },
      { status: 500 }
    )
  }
}
