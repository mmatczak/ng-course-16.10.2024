import { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs';

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = '123';
  const newRequest = req.clone({
    setHeaders: { Authorisation: `Bearer ${token}` }
  });
  return next(newRequest);
};
