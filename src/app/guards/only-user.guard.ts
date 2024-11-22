import { CanActivateFn, RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const onlyUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (authService.token() !== null) return true;
  const router = inject(Router)
  const urlTree: UrlTree = router.parseUrl('/login');
  return new RedirectCommand(urlTree, { skipLocationChange: true });
};
