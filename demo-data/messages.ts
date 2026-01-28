export interface DemoMessage {
  id: string;
  from: string;
  fromRole: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE' | 'SYSTEM';
  to: string;
  toRole: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE' | 'SYSTEM';
  subject: string;
  content: string;
  date: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export const demoMessages: DemoMessage[] = [
  {
    id: '1',
    from: 'Accountant Team',
    fromRole: 'ACCOUNTANT',
    to: 'Demo Customer',
    toRole: 'USER',
    subject: 'Invoice #INV-2024-001 ready for download',
    content: 'Your invoice for order ORD-2024-001 has been generated and is available in your account. Please proceed with payment within 14 days.',
    date: '2024-01-16T10:30:00',
    read: false,
    priority: 'normal',
  },
  {
    id: '2',
    from: 'Warehouse Team',
    fromRole: 'WAREHOUSE',
    to: 'Demo Customer',
    toRole: 'USER',
    subject: 'Order ORD-2024-002 ready for shipment',
    content: 'Your order ORD-2024-002 has been packed and is ready for shipment. Tracking number will be provided once dispatched.',
    date: '2024-01-23T14:15:00',
    read: true,
    priority: 'normal',
  },
  {
    id: '3',
    from: 'System',
    fromRole: 'SYSTEM',
    to: 'Demo Customer',
    toRole: 'USER',
    subject: 'New order confirmation: ORD-2024-005',
    content: 'Your order ORD-2024-005 has been received and is being processed. Expected processing time: 2-3 business days.',
    date: '2024-01-25T09:00:00',
    read: false,
    priority: 'low',
  },
  {
    id: '4',
    from: 'Demo Customer',
    fromRole: 'USER',
    to: 'Accountant Team',
    toRole: 'ACCOUNTANT',
    subject: 'Payment confirmation for ORD-2024-001',
    content: 'Payment for invoice INV-2024-001 has been transferred. Please confirm receipt.',
    date: '2024-01-18T11:45:00',
    read: true,
    priority: 'normal',
  },
  {
    id: '5',
    from: 'Warehouse Team',
    fromRole: 'WAREHOUSE',
    to: 'Accountant Team',
    toRole: 'ACCOUNTANT',
    subject: 'Stock alert: Low inventory for FAB-WOL-145',
    content: 'Wool Blend Fabric 145cm (FAB-WOL-145) stock is below minimum threshold. Current stock: 320m. Please consider reordering.',
    date: '2024-01-24T08:30:00',
    read: false,
    priority: 'high',
  },
];
