import type { DemoRole } from './demoAuth';

export interface PanelConfig {
  role: DemoRole;
  label: string;
  path: string;
  icon: string;
}

export const PANELS: PanelConfig[] = [
  { role: 'USER', label: 'Customer Panel', path: '/customer', icon: '👤' },
  { role: 'ACCOUNTANT', label: 'Accountant Panel', path: '/accountant', icon: '📊' },
  { role: 'WAREHOUSE', label: 'Warehouse Panel', path: '/warehouse', icon: '📦' },
];

/** Demo: all panels allowed for any authenticated user (role switching enabled) */
export function getAllowedPanels(): PanelConfig[] {
  return PANELS;
}
