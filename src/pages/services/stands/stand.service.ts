import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Stand } from 'src/models/hacienda/stand';

@Injectable({
  providedIn: 'root'
})
export class StandService {

  microservicio = `${environment.api}/CattleFairs/api/v1/`;

  constructor(private http: HttpClient) { }

  public getAllFairs(pageNumber: number, pageSize: number): Observable<Stand> {
    return this.http.get<any>(`${this.microservicio}Stands?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }
}
