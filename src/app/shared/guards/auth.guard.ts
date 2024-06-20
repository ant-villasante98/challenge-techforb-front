import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../services/auth-manager.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authManager = inject(AuthManagerService);
  const creadenciales = authManager.getCredentials()
  if (creadenciales) {
    return true;
  }
  let currentUrl = `/${route.routeConfig?.path ?? ""}`
  router.navigateByUrl('/auth', { state: { url: currentUrl } })
  return false
};
