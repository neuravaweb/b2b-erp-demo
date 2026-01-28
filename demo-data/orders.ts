export interface DemoOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'packing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: string;
  items: DemoOrderItem[];
  leadTimeWarning?: boolean;
  deliveryDate?: string;
}

export interface DemoOrderItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export const demoOrders: DemoOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerId: '1',
    customerName: 'Demo Customer',
    date: '2024-01-15',
    status: 'processing',
    total: 4560.00,
    currency: 'PLN',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Premium Cotton Fabric 150cm',
        productCode: 'FAB-COT-150',
        quantity: 100,
        unit: 'm',
        price: 45.50,
        total: 4550.00,
      },
    ],
    leadTimeWarning: false,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerId: '1',
    customerName: 'Demo Customer',
    date: '2024-01-20',
    status: 'packing',
    total: 3100.00,
    currency: 'PLN',
    items: [
      {
        id: '2',
        productId: '3',
        productName: 'Polyester Twill 160cm',
        productCode: 'FAB-POL-160',
        quantity: 50,
        unit: 'm',
        price: 28.75,
        total: 1437.50,
      },
      {
        id: '3',
        productId: '4',
        productName: 'Wool Blend Fabric 145cm',
        productCode: 'FAB-WOL-145',
        quantity: 20,
        unit: 'm',
        price: 89.00,
        total: 1780.00,
      },
    ],
    leadTimeWarning: false,
    deliveryDate: '2024-01-25',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerId: '2',
    customerName: 'Textile Solutions Sp. z o.o.',
    date: '2024-01-22',
    status: 'pending',
    total: 6200.00,
    currency: 'PLN',
    items: [
      {
        id: '4',
        productId: '2',
        productName: 'Linen Blend Fabric 140cm',
        productCode: 'FAB-LIN-140',
        quantity: 100,
        unit: 'm',
        price: 62.00,
        total: 6200.00,
      },
    ],
    leadTimeWarning: true,
    deliveryDate: '2024-02-01',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerId: '3',
    customerName: 'Fashion Manufacturing Ltd.',
    date: '2024-01-18',
    status: 'shipped',
    total: 12500.00,
    currency: 'PLN',
    items: [
      {
        id: '5',
        productId: '5',
        productName: 'Silk Fabric 120cm',
        productCode: 'FAB-SIL-120',
        quantity: 100,
        unit: 'm',
        price: 125.00,
        total: 12500.00,
      },
    ],
    leadTimeWarning: true,
    deliveryDate: '2024-01-28',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customerId: '1',
    customerName: 'Demo Customer',
    date: '2024-01-25',
    status: 'pending',
    total: 2275.00,
    currency: 'PLN',
    items: [
      {
        id: '6',
        productId: '1',
        productName: 'Premium Cotton Fabric 150cm',
        productCode: 'FAB-COT-150',
        quantity: 50,
        unit: 'm',
        price: 45.50,
        total: 2275.00,
      },
    ],
    leadTimeWarning: false,
  },
];
