import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { City } from 'src/models/hacienda/city';
import { State } from 'src/models/hacienda/state';
import { Contracts } from 'src/providers/api';
import { IGlobalization } from '../contracts/globalization.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalizationService implements IGlobalization {

  constructor(private http: HttpClient) {}

  public getAllStates(pageNumber: number, pageSize: number): Observable<State> {
    return this.http.get<any>(`${environment.api}/Globalization/api/v1/States?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public getAllCities(pageNumber: number, pageSize: number): Observable<City> {
    return this.http.get<any>(`${environment.api}/Globalization/api/v1/Cities?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }
}
