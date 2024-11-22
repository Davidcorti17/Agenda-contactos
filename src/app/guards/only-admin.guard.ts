import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const onlyAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (authService.user()?.role === 'Admin') return true;
  const router = inject(Router)
  const urlTree: UrlTree = router.parseUrl('/login');
  return new RedirectCommand(urlTree, { skipLocationChange: true });
};
