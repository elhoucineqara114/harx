import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, targetUserId } = body

    return NextResponse.json({
      success: true,
      data: {
        score: 0.85,
        factors: [
          { name: 'interests', weight: 0.4, score: 0.9 },
          { name: 'location', weight: 0.3, score: 0.8 },
          { name: 'activity', weight: 0.3, score: 0.85 },
        ],
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CALCULATION_FAILED',
          message: 'Failed to calculate match score',
        },
      },
      { status: 500 }
    )
  }
}
