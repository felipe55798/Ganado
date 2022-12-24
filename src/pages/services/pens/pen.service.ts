import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contracts } from 'src/providers/api';
import { IPen } from '../contracts/pens.interface';
import { GrassType } from '../../../models/hacienda/grassType';
import { LandType } from '../../../models/hacienda/landType';
import { Pen } from 'src/models/hacienda/pen';
import { Group } from 'src/models/hacienda/group';

@Injectable({
  providedIn: 'root'
})
export default class PenService implements IPen {

  
  constructor(private api:Contracts.IApi) { 
    this.api.setGateway("CattleRaising");
  }
  
  public getPensByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.api.get<any>(`FarmYards?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
  
  public getGrassTypes(pageNumber: number, pageSize: number): Observable<GrassType> {
    return this.api.get<any>(`GrassTypes?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
  
  public getLandTypes(pageNumber: number, pageSize: number): Observable<LandType> {
    return this.api.get<any>(`LandTypes?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
  public getGroups(pageNumber: number, pageSize: number): Observable<Group> {
    return this.api.get<any>(`Groups?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }

  public createPen(pen: Pen){
    return this.api.post<Pen>(`FarmYards`, pen);
  }
  public updatePen(pen: Pen){
    return this.api.put<Pen>(`FarmYards/${pen.id}`, pen);
  }
  public deletePen(penId: string): Observable<any> {
    return this.api.delete<Pen>(`FarmYards/${penId}`);
  }
}
