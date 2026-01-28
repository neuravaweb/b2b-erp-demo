import { NextResponse } from 'next/server';
import type { DemoRole } from '@/lib/demoAuth';

export async function POST(request: Request) {
  try {
    const { role } = await request.json();

    if (!role || !['USER', 'ACCOUNTANT', 'WAREHOUSE'].includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      role: role as DemoRole,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
