import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreatePlant } from '../../models/create-plant';
import { Observable, map } from 'rxjs';
import { Plant } from '../../models/plant';
import { SuccessResponse } from '../../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private URL_API: string = `${environment.API}/plants`;

  private httpClient = inject(HttpClient);

  constructor() { }

  create(body: CreatePlant) {
    return this.httpClient.post(this.URL_API, body);
  }

  get(): Observable<Plant[]> {
    return this.httpClient.get<SuccessResponse<Plant[]>>(this.URL_API).pipe(
      map(res => res.data)
    )
  }
}
