import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id

  return NextResponse.json({
    success: true,
    data: {
      id: userId,
      email: 'user@example.com',
      name: 'Sample User',
      bio: 'Sample bio',
      createdAt: new Date().toISOString(),
    },
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const body = await request.json()

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: userId,
        ...body,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPDATE_FAILED',
          message: 'Failed to update user',
        },
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id

  return NextResponse.json({
    success: true,
    message: 'User deleted successfully',
  })
}
