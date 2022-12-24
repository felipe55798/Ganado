import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Weather } from 'src/models/hacienda/weather';
import { Contracts } from 'src/providers/api';
import { IFarm } from '../contracts/farm.interface';
import { CattleFarm } from '../../../models/hacienda/cattleFarm';

@Injectable({
  providedIn: 'root'
})
export class FarmService implements IFarm {

  constructor(private api:Contracts.IApi) { 
    this.api.setGateway("CattleRaising");
  }

  public getAllWheathers(pageNumber: number, pageSize: number): Observable<Weather> {
    return this.api.get<any>(`Weathers?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
  
  public updateFarm(farm: CattleFarm){
    return this.api.put<CattleFarm>(`CattleFarms/${farm.id}`, farm);
  }
  
  public getFarmById(idFarm: string): Observable<any> {
    return this.api.get<CattleFarm>(`CattleFarms/${idFarm}`, null);
  }
}
