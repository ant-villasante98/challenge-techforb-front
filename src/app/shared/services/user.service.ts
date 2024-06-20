import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDetails } from '../../models/user-details';
import { SuccessResponse } from '../../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = `${environment.API}/users`;
  private httpClient = inject(HttpClient);

  constructor() { }

  getDetails(): Observable<UserDetails> {
    return this.httpClient.get<SuccessResponse<UserDetails>>(`${this.API_URL}/me`)
      .pipe(map(res => {
        return res.data
      }));

  }
}
