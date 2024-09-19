import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  alert('you are not authorized')
  return false;
};
