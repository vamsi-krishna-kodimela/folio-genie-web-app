import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';

export const onboardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.user.value?.status) {
    const status = authService.user.value?.status;
    const actualRoute = authService.handleUserOnboarding(status);
    if (state.url.includes(actualRoute)) {
      return true;
    }
    router.navigateByUrl(actualRoute);
  }
  return false;
};
