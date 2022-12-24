import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contracts } from 'src/providers/api';
import { IPositions } from '../contracts/positions.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionsService implements IPositions {

  constructor(private api:Contracts.IApi,) {
  }
  public getPositions(): Observable<any> {
    return this.api.get<any>("catalogs/positions/inroute/");
  }


}
