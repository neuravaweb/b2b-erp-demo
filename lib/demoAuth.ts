import { demoUsers } from '@/demo-data/users';

export type DemoRole = 'USER' | 'ACCOUNTANT' | 'WAREHOUSE';

export interface DemoAuthResult {
  success: boolean;
  message?: string;
  role?: DemoRole;
}

export function validateDemoLogin(username: string, password: string): DemoAuthResult {
  const user = demoUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password',
    };
  }

  return {
    success: true,
    role: user.role,
  };
}

export function getDemoRole(): DemoRole | null {
  if (typeof window === 'undefined') return null;
  const role = localStorage.getItem('demoRole');
  return role as DemoRole | null;
}

export function setDemoRole(role: DemoRole): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('demoRole', role);
}

export function clearDemoAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('demoRole');
}

export function isDemoAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('demoRole') !== null;
}
