import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  return NextResponse.json({
    success: true,
    data: {
      totalConnections: 0,
      totalMessages: 0,
      totalMatches: 0,
      activeNow: 0,
      recentActivity: [],
    },
  })
}
