import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IClasificacion } from '../contracts/clasification.interface';
import { Clasification } from 'src/models/hacienda/clasification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificationService implements IClasificacion {

  microservicio = `${environment.api}/CattleRaising/api/v1/`;

  constructor(private http: HttpClient) { }

  public getAllClasificationsByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.microservicio}Clasifications?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public createClasification(clasification: Clasification){
    return this.http.post<Clasification>(`${this.microservicio}Clasifications`, clasification);
  }
  public updateClasification(clasification: Clasification){
    return this.http.put<Clasification>(`${this.microservicio}Clasifications/${clasification.id}`, clasification);
  }
  public deleteClasification(clasificationId: string): Observable<any> {
    return this.http.delete<any>(`${this.microservicio}Clasifications/${clasificationId}`);
  }
}
