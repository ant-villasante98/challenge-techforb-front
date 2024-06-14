import { HttpInterceptorFn } from '@angular/common/http';

export const errorApiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
