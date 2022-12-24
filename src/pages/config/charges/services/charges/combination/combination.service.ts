import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combination } from 'src/pages/config/models/combination/combination';
import { Contracts } from 'src/providers/api';
import { ICombination } from '../../contracts/combination.interface';

@Injectable({
  providedIn: 'root'
}) 
export class CombinationService implements ICombination{

  constructor(private api:Contracts.IApi,) { }

  // public getCombinationByCharge(idCharge: number): Observable<Combination> {
  //   return this.api.get<Combination>(`catalogs/positions/${idCharge}/combinations`);       
  // }
  public createCombination(combination: any) {
    return this.api.post<any>(`catalogs/positions/${combination.positionid}/combinations/`, combination);
  }
  public editCombination(combination: any, idCharge: number) {
    return this.api.patch<any>(`catalogs/positions/${idCharge}/combinations/${combination.combinationid}/`, combination);
  }
  public deleteCombination(idCharge: number, idCombination: number) {
    return this.api.delete<any>(`catalogs/positions/${idCharge}/combinations/${idCombination}/`);
  }
}
