import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';
import { AuthManagerService } from '../services/auth-manager.service';
import { Router } from '@angular/router';
import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';

export const errorApiInterceptor: HttpInterceptorFn = (req, next) => {
  const API_URL = environment.API;
  const authService = inject(AuthService);
  const authManager = inject(AuthManagerService);
  const router = inject(Router);

  console.log(`--Interceptor-Error: peticion ${req.url}`)


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // cuando el acceso es unauthorized
      if (error.status == HttpStatusCode.Unauthorized) {

        if (req.url === `${API_URL}/auth/refresh`) {
          router.navigateByUrl("/auth/login")
          return throwError(() => error);
        }

        let credentials = authManager.getCredentials()
        if (!credentials) {
          router.navigateByUrl("/auth/login")
          return throwError(() => error);
        }
        console.log("Iniciando peticion de refresh token")
        if (authManager.tokenRefreshing) {
          return EMPTY;
        }
        authManager.tokenRefreshing = true
        return authService.refresh(credentials.refreshToken)
          .pipe(
            concatMap((response) => {
              //agregar las nuevas credenciales
              const newReq = authManager.addAccessToken(req);
              //volver a llamar la anterior peticion
              return next(newReq);

            }),
            catchError(() => {
              //en caso no se pueda autorizar el refresh
              authManager.rmCreadentials()
              router.navigateByUrl('/auth')
              return EMPTY
            }),
            finalize(() => {
              authManager.tokenRefreshing = false;
            })
          )
      }
      return throwError(() => error);
    })
  );
};
