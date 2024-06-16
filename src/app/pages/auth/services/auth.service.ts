import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UserAuth } from '../../../models/user-auth';
import { UserLogin } from '../../../models/user-login';
import { UserRegister } from '../../../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private URL_API: string = `${environment.API}/auth`;

  constructor() { }

  public login(userLogin: UserLogin): Observable<UserAuth> {
    console.log(userLogin)
    return this.httpClient.post<UserAuth>(`${this.URL_API}/login`, userLogin);
  }

  public register(userRegister: UserRegister): Observable<any> {
    return this.httpClient.post(`${this.URL_API}/register`, userRegister);
  }

  public refresh(refreshToken: string): Observable<UserAuth> {
    return this.httpClient.post<UserAuth>(`${this.URL_API}/refresh`, { refreshToken })
  }
}
