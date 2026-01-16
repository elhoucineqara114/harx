import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const notificationId = params.id

  return NextResponse.json({
    success: true,
    message: 'Notification marked as read',
    data: {
      id: notificationId,
      read: true,
    },
  })
}
