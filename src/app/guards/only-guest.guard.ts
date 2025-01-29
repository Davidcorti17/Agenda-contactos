import { CanActivateFn, RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const onlyGuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (!authService.token()) return true;
  const router = inject(Router)
  const urlTree: UrlTree = router.parseUrl('/contacts');
  return new RedirectCommand(urlTree);
};
