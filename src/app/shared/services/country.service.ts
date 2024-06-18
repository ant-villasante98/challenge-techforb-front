import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../models/success-response';
import { Country } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private URL_API = `${environment.API}/countries`;

  private httpClient = inject(HttpClient)
  constructor() { }

  getAll(): Observable<SuccessResponse<Country[]>> {
    return this.httpClient.get<SuccessResponse<Country[]>>(this.URL_API);
  }

}
