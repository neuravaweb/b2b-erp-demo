import type { DemoRole } from './demoAuth';

export interface MenuItem {
  href: string;
  label: string;
  icon: string;
}

export const CUSTOMER_MENU_ITEMS: MenuItem[] = [
  { href: '/customer', label: 'Dashboard', icon: '📊' },
  { href: '/customer/new-order', label: 'New Order', icon: '➕' },
  { href: '/customer/orders', label: 'List of Orders', icon: '📋' },
  { href: '/customer/fabric-charts', label: 'Fabric Charts', icon: '📈' },
  { href: '/customer/announcements', label: 'Announcements', icon: '📢' },
  { href: '/customer/messages', label: 'Messages', icon: '✉️' },
  { href: '/customer/my-data', label: 'My Data', icon: '👤' },
  { href: '/customer/change-password', label: 'Change Password', icon: '🔒' },
];

export const ACCOUNTANT_MENU_ITEMS: MenuItem[] = [
  { href: '/accountant', label: 'Dashboard', icon: '📊' },
  { href: '/accountant/orders', label: 'All Orders', icon: '📋' },
  { href: '/accountant/products', label: 'Products and States', icon: '📦' },
  { href: '/accountant/add-order', label: 'Add an Order', icon: '➕' },
  { href: '/accountant/fabric-charts', label: 'Fabric Charts', icon: '📈' },
  { href: '/accountant/messages', label: 'Messages', icon: '✉️' },
  { href: '/accountant/announcements', label: 'Announcements', icon: '📢' },
  { href: '/accountant/new-customer', label: 'New Customer', icon: '👤' },
  { href: '/accountant/new-customers-fair', label: 'New Customers from the fair', icon: '🎪' },
  { href: '/accountant/customers', label: 'Customers', icon: '🏢' },
  { href: '/accountant/password-reset', label: 'Password Reset', icon: '🔒' },
];

export const WAREHOUSE_MENU_ITEMS: MenuItem[] = [
  { href: '/warehouse', label: 'Warehouse Alerts', icon: '⚠️' },
  { href: '/warehouse/packing', label: 'Packing Orders', icon: '📦' },
  { href: '/warehouse/delivery-10days', label: 'Orders – Delivery up to 10 Days', icon: '🚚' },
  { href: '/warehouse/defective', label: 'Defective for Verification', icon: '🔍' },
  { href: '/warehouse/products', label: 'Products and stock levels', icon: '📊' },
];

export function getMenuItemsForRole(role: DemoRole): MenuItem[] {
  switch (role) {
    case 'USER':
      return CUSTOMER_MENU_ITEMS;
    case 'ACCOUNTANT':
      return ACCOUNTANT_MENU_ITEMS;
    case 'WAREHOUSE':
      return WAREHOUSE_MENU_ITEMS;
    default:
      return CUSTOMER_MENU_ITEMS;
  }
}
