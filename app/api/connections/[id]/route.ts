import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connectionId = params.id

  return NextResponse.json({
    success: true,
    data: {
      id: connectionId,
      status: 'accepted',
      createdAt: new Date().toISOString(),
    },
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connectionId = params.id
    const body = await request.json()
    const { status } = body

    return NextResponse.json({
      success: true,
      message: 'Connection updated successfully',
      data: {
        id: connectionId,
        status,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPDATE_FAILED',
          message: 'Failed to update connection',
        },
      },
      { status: 500 }
    )
  }
}
