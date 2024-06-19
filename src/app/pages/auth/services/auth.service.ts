import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UserAuth } from '../../../models/user-auth';
import { UserLogin } from '../../../models/user-login';
import { UserRegister } from '../../../models/user-register';
import { AuthManagerService } from '../../../shared/services/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private authMService = inject(AuthManagerService);

  private URL_API: string = `${environment.API}/auth`;

  constructor() { }

  public login(userLogin: UserLogin): Observable<UserAuth> {
    console.log(userLogin)
    return this.httpClient.post<UserAuth>(`${this.URL_API}/login`, userLogin)
      .pipe(
        map(res => {
          this.authMService.setCredentials(res);
          return res;
        }));
  }

  public register(userRegister: UserRegister): Observable<any> {
    return this.httpClient.post(`${this.URL_API}/register`, userRegister);
  }

  public refresh(refreshToken: string): Observable<UserAuth> {
    return this.httpClient.post<UserAuth>(`${this.URL_API}/refresh`, { refreshToken })
      .pipe(
        map(res => {
          this.authMService.setCredentials(res);
          return res;
        }));
  }
}
