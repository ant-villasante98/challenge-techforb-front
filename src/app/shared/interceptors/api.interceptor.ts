import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthManagerService } from '../services/auth-manager.service';
import { environment } from '../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`--Interceptor-API: peticion ${req.url}`)
  const API_URL: string = environment.API;
  const authManager = inject(AuthManagerService);

  // verificar si es la ruta de logink
  if (req.url === `${API_URL}/auth/login`) {

    return next(req);
  }

  // validar si se esta refrescando el token
  // if ("isRefresh" == "isRefresh" ) {
  //   return EMPTY;
  // }

  // validar si estan los datos del usuario y el refreshToken
  // if (true) {
  // inject(Router).navigateByUrl("/", { skipLocationChange: false });
  //   return EMPTY;
  // }

  // agregar los token  -- mejorar logica
  let newReq = authManager.addAccessToken(req);
  return next(newReq);
};
