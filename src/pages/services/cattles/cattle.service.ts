import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contracts } from 'src/providers/api';
import { ICattle } from '../contracts/cattle.interface';
import { Cattle } from '../../../models/hacienda/cattle';

@Injectable({
  providedIn: 'root'
})
export class CattleService implements ICattle{

  constructor(private api:Contracts.IApi) { 
    this.api.setGateway("CattleRaising");
  }
  
  public getAllCattlesByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.api.get<any>(`Cattles?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }


  public createCattle(cattle: Cattle){
    return this.api.post<Cattle>(`Cattles`, cattle);
  }
  public updateCattle(pen: Cattle){
    return this.api.put<Cattle>(`Cattles/${pen.id}`, pen);
  }
  public deleteCattle(penId: string): Observable<any> {
    return this.api.delete<any>(`Cattles/${penId}`);
  }
}
