import { NextResponse } from 'next/server';
import { getDemoProducts, getDemoOrders, getDemoMessages, getDemoAnnouncements, getDemoCustomers, getDemoPasswordReset, getDemoWarehouseAlerts } from '@/lib/demoApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const role = searchParams.get('role');

  try {
    switch (type) {
      case 'products':
        return NextResponse.json({ success: true, data: getDemoProducts() });
      case 'orders':
        return NextResponse.json({ success: true, data: getDemoOrders() });
      case 'messages':
        return NextResponse.json({ success: true, data: getDemoMessages(role || undefined) });
      case 'announcements':
        return NextResponse.json({ success: true, data: getDemoAnnouncements() });
      case 'customers':
        return NextResponse.json({ success: true, data: getDemoCustomers() });
      case 'password-reset':
        return NextResponse.json({ success: true, data: getDemoPasswordReset() });
      case 'warehouse-alerts':
        return NextResponse.json({ success: true, data: getDemoWarehouseAlerts() });
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid type parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
