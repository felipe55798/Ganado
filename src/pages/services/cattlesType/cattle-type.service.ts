import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contracts } from 'src/providers/api';
import { ICattleType } from '../contracts/cattleType.interface';
import { CattleType } from '../../../models/hacienda/cattleType';


@Injectable({
  providedIn: 'root'
})
export class CattleTypeService implements ICattleType{

  constructor(private api:Contracts.IApi) { 
    this.api.setGateway("CattleRaising");
  }
  
  public getCattleTypeByPage(pageNumber: number, pageSize: number): Observable<CattleType> {
    return this.api.get<any>(`CattleTypes?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
  public getCattleByType(pageNumber: number, pageSize: number, idCattleType: string): Observable<any> {
    return this.api.get<any>(`CattleTypes/${idCattleType}/Cattles?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
}
