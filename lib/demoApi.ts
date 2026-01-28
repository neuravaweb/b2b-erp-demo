import { demoProducts } from '@/demo-data/products';
import { demoOrders } from '@/demo-data/orders';
import { demoMessages } from '@/demo-data/messages';
import { demoAnnouncements } from '@/demo-data/announcements';
import type { DemoProduct } from '@/demo-data/products';
import type { DemoOrder } from '@/demo-data/orders';
import type { DemoMessage } from '@/demo-data/messages';
import type { DemoAnnouncement } from '@/demo-data/announcements';

export function getDemoProducts(): DemoProduct[] {
  return demoProducts;
}

export function getDemoProduct(id: string): DemoProduct | undefined {
  return demoProducts.find((p) => p.id === id);
}

export function getDemoOrders(): DemoOrder[] {
  return demoOrders;
}

export function getDemoOrder(id: string): DemoOrder | undefined {
  return demoOrders.find((o) => o.id === id);
}

export function getDemoMessages(role?: string): DemoMessage[] {
  if (!role) return demoMessages;
  return demoMessages.filter(
    (m) => m.toRole === role || m.fromRole === role
  );
}

export function getDemoAnnouncements(): DemoAnnouncement[] {
  return demoAnnouncements;
}

export function getDemoAnnouncement(id: string): DemoAnnouncement | undefined {
  return demoAnnouncements.find((a) => a.id === id);
}

// Dummy customers for accountant panel
export interface DemoCustomer {
  id: string;
  name: string;
  vatNumber: string;
  city: string;
  email: string;
  status: 'active' | 'inactive';
}

export const demoCustomers: DemoCustomer[] = [
  {
    id: '2',
    name: 'Textile Solutions Sp. z o.o.',
    vatNumber: 'PL1234567890',
    city: 'Warsaw',
    email: 'contact@textilesolutions.pl',
    status: 'active',
  },
  {
    id: '3',
    name: 'Fashion Manufacturing Ltd.',
    vatNumber: 'PL9876543210',
    city: 'Krakow',
    email: 'info@fashionmfg.pl',
    status: 'active',
  },
  {
    id: '4',
    name: 'Premium Fabrics S.A.',
    vatNumber: 'PL5555555555',
    city: 'Gdansk',
    email: 'sales@premiumfabrics.pl',
    status: 'active',
  },
];

export function getDemoCustomers(): DemoCustomer[] {
  return demoCustomers;
}

// Dummy password reset request
export interface DemoPasswordReset {
  id: string;
  customerName: string;
  email: string;
  date: string;
  status: 'pending';
}

export const demoPasswordReset: DemoPasswordReset = {
  id: '1',
  customerName: 'Textile Solutions Sp. z o.o.',
  email: 'contact@textilesolutions.pl',
  date: '2024-01-24',
  status: 'pending',
};

export function getDemoPasswordReset(): DemoPasswordReset | null {
  return demoPasswordReset;
}

// Warehouse alerts
export interface DemoWarehouseAlert {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'defective' | 'expiring';
  productId: string;
  productName: string;
  productCode: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  date: string;
}

export const demoWarehouseAlerts: DemoWarehouseAlert[] = [
  {
    id: '1',
    type: 'low_stock',
    productId: '4',
    productName: 'Wool Blend Fabric 145cm',
    productCode: 'FAB-WOL-145',
    message: 'Stock level below minimum threshold: 320m remaining',
    priority: 'high',
    date: '2024-01-24',
  },
  {
    id: '2',
    type: 'out_of_stock',
    productId: '2',
    productName: 'Linen Blend Fabric 140cm',
    productCode: 'FAB-LIN-140',
    message: 'Product out of stock. Lead time: 10 days',
    priority: 'urgent',
    date: '2024-01-23',
  },
  {
    id: '3',
    type: 'defective',
    productId: '6',
    productName: 'Defective Cotton Sample',
    productCode: 'FAB-DEF-001',
    message: '15m of defective product requires verification',
    priority: 'normal',
    date: '2024-01-22',
  },
];

export function getDemoWarehouseAlerts(): DemoWarehouseAlert[] {
  return demoWarehouseAlerts;
}
