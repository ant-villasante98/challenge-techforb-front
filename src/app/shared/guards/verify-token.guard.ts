import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../services/auth-manager.service';

export const verifyTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authManager = inject(AuthManagerService);
  if (authManager.getCredentials()) {
    router.navigateByUrl("/dashboard")
    return false;
  }
  return true;
};
