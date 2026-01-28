export interface DemoProduct {
  id: string;
  name: string;
  code: string;
  stock: number;
  unit: string;
  price: number;
  leadTime: number; // days
  category: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'defective';
}

export const demoProducts: DemoProduct[] = [
  {
    id: '1',
    name: 'Premium Cotton Fabric 150cm',
    code: 'FAB-COT-150',
    stock: 1250,
    unit: 'm',
    price: 45.50,
    leadTime: 0,
    category: 'Cotton',
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Linen Blend Fabric 140cm',
    code: 'FAB-LIN-140',
    stock: 0,
    unit: 'm',
    price: 62.00,
    leadTime: 10,
    category: 'Linen',
    status: 'out_of_stock',
  },
  {
    id: '3',
    name: 'Polyester Twill 160cm',
    code: 'FAB-POL-160',
    stock: 850,
    unit: 'm',
    price: 28.75,
    leadTime: 0,
    category: 'Polyester',
    status: 'in_stock',
  },
  {
    id: '4',
    name: 'Wool Blend Fabric 145cm',
    code: 'FAB-WOL-145',
    stock: 320,
    unit: 'm',
    price: 89.00,
    leadTime: 0,
    category: 'Wool',
    status: 'low_stock',
  },
  {
    id: '5',
    name: 'Silk Fabric 120cm',
    code: 'FAB-SIL-120',
    stock: 0,
    unit: 'm',
    price: 125.00,
    leadTime: 10,
    category: 'Silk',
    status: 'out_of_stock',
  },
  {
    id: '6',
    name: 'Defective Cotton Sample',
    code: 'FAB-DEF-001',
    stock: 15,
    unit: 'm',
    price: 0,
    leadTime: 0,
    category: 'Cotton',
    status: 'defective',
  },
  {
    id: '7',
    name: 'Defective Linen Sample',
    code: 'FAB-DEF-002',
    stock: 8,
    unit: 'm',
    price: 0,
    leadTime: 0,
    category: 'Linen',
    status: 'defective',
  },
  {
    id: '8',
    name: 'Defective Polyester Sample',
    code: 'FAB-DEF-003',
    stock: 22,
    unit: 'm',
    price: 0,
    leadTime: 0,
    category: 'Polyester',
    status: 'defective',
  },
];
