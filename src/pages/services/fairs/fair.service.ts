import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Fair } from 'src/models/hacienda/fair';
import { FairSchedule } from 'src/models/hacienda/fairSchedule';
import { Contracts } from 'src/providers/api';
import { IFair } from '../contracts/fair.interface';

@Injectable({
  providedIn: 'root'
})
export class FairService implements IFair {

  microservicio = `${environment.api}/CattleFairs/api/v1/`;

  constructor(private http: HttpClient) { 
  }

  public getAllFairs(pageNumber: number, pageSize: number): Observable<Fair> {
    return this.http.get<any>(`${this.microservicio}Fairs?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public getAllSchedules(pageNumber: number, pageSize: number): Observable<FairSchedule> {
    return this.http.get<any>(`${this.microservicio}Schedules?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public createFair(pen: Fair){
    return this.http.post<Fair>(`${this.microservicio}Fairs`, pen);
  }
  public updateFair(pen: Fair){
    return this.http.put<Fair>(`${this.microservicio}Fairs/${pen.id}`, pen);
  }
  public deleteFair(penId: string): Observable<any> {
    return this.http.delete<Fair>(`${this.microservicio}Fairs/${penId}`);
  }
  
}
