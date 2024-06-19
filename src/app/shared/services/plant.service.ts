import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreatePlant } from '../../models/create-plant';
import { Observable, map } from 'rxjs';
import { Plant } from '../../models/plant';
import { SuccessResponse } from '../../models/success-response';
import { GlobalReading } from '../../models/global-reading';

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
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL_API}/${id}`)

  }

  getGlobalReading(): Observable<GlobalReading> {
    return this.httpClient.get<SuccessResponse<GlobalReading>>(`${this.URL_API}/global-reading`)
      .pipe(map(res => res.data));
  }
}
