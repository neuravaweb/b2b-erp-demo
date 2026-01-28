import { getDemoRole } from './demoAuth';
import type { DemoRole } from './demoAuth';

export function getCurrentDemoSession(): { role: DemoRole | null; authenticated: boolean } {
  const role = getDemoRole();
  return {
    role,
    authenticated: role !== null,
  };
}

export function requireDemoAuth(requiredRole?: DemoRole): boolean {
  const session = getCurrentDemoSession();
  if (!session.authenticated) return false;
  if (requiredRole && session.role !== requiredRole) return false;
  return true;
}
