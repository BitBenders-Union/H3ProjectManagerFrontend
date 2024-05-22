import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(TokenService)
  const router = inject(Router)
  if(auth.isLoggedIn())
    {
      return true;
    }
    else
    {
      router.navigate(['/login']);
      return false
    }
};
