import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const limit = parseInt(searchParams.get('limit') || '10')

  return NextResponse.json({
    success: true,
    data: [],
    message: 'Match candidates retrieved successfully',
  })
}
