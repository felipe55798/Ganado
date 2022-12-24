import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charge } from 'src/pages/config/models/charges/charge';
import { Contracts } from 'src/providers/api';
import { ICharge } from '../../contracts/charge.interface';
import { TypeZone } from '../../../../models/zone-type';
import { Combination } from 'src/pages/config/models/combination/combination';

@Injectable({
  providedIn: 'root'
})
export class ChargeService implements ICharge{

  constructor(private api:Contracts.IApi,) { }

  public getCharges(): Observable<Charge> {
    return this.api.get<Charge>("catalogs/positions/");       
  }
  public createCharge(catalog: Charge) {
    return this.api.post<any>("catalogs/positions/", catalog);
  }
  public getChargeByID(idCharge: number){
    return this.api.get<Charge>(`catalogs/positions/${idCharge}`);
  }

  public editCharge(charge: Charge) {
    return this.api.patch<Charge>(`catalogs/positions/${charge.id}/`, charge);
  }
  public deleteCharge(idCharge: number) {
    return this.api.delete<any>(`catalogs/positions/${idCharge}`);
  }

  public getZoneTypes(){
    return this.api.get<TypeZone[]>("catalogs/positions/zone_types");       
  }

  public getCombinationsByCharge(idCharge: number){
    return this.api.get<Combination[]>(`catalogs/positions/${idCharge}/combinations`);
  }

  public getFrecuencies(){
    return this.api.get<any[]>("catalogs/positions/frecuency");   
  }
}
