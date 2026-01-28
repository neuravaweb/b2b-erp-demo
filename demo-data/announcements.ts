export interface DemoAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'general' | 'product' | 'system' | 'maintenance';
  priority: 'low' | 'normal' | 'high';
}

export const demoAnnouncements: DemoAnnouncement[] = [
  {
    id: '1',
    title: 'New Product Catalog Available',
    content: 'We are pleased to announce the release of our 2024 Spring/Summer fabric catalog. The catalog includes over 200 new fabric designs and patterns. All customers will receive a printed copy by mail within 2 weeks. Digital version is available for download in your account.',
    date: '2024-01-10',
    author: 'Sales Department',
    category: 'product',
    priority: 'normal',
  },
  {
    id: '2',
    title: 'System Maintenance Scheduled',
    content: 'Scheduled maintenance will be performed on Sunday, January 28, 2024, from 02:00 AM to 06:00 AM CET. During this time, the portal will be temporarily unavailable. We apologize for any inconvenience.',
    date: '2024-01-15',
    author: 'IT Department',
    category: 'maintenance',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Holiday Shipping Schedule',
    content: 'Please note that orders placed after January 25, 2024, may experience delays due to the upcoming holiday period. We recommend placing urgent orders before this date to ensure timely delivery.',
    date: '2024-01-20',
    author: 'Logistics Department',
    category: 'general',
    priority: 'normal',
  },
  {
    id: '4',
    title: 'New Payment Methods Available',
    content: 'We have added support for instant bank transfers and credit card payments. These new payment methods are available for all orders above 1000 PLN. Please check the payment section for more details.',
    date: '2024-01-12',
    author: 'Finance Department',
    category: 'general',
    priority: 'low',
  },
];
