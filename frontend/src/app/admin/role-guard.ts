import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

export const roleGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuth();

  if (!isAuthenticated) {
    return router.createUrlTree(['/login']);
  }

  if (authService.user()?.role_id === 1) {
    return true;
  }

  return router.createUrlTree(['/home']);
};


