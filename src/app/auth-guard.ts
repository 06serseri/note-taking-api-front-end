import { inject } from '@angular/core';
import { ApiService } from './Services/api.service';
import { Router } from '@angular/router';

export const CanActivate = () => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  //IF THE USER IS LOGGED IN RETURN TRUE
  if (apiService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
