export interface DemoUser {
  id: string;
  username: string;
  password: string;
  role: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE';
  name: string;
  email: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: '1',
    username: 'demo',
    password: 'demo123',
    role: 'USER',
    name: 'Demo Customer',
    email: 'demo@customer.pl',
  },
];
