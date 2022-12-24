import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lote } from 'src/models/hacienda/lote';
import { Contracts } from 'src/providers/api';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private api:Contracts.IApi) { 
    this.api.setGateway("CattleRaising");
  }

  public getLotesByPage(pageNumber: number, pageSize: number): Observable<Lote> {
    return this.api.get<any>(`Lotes?PageNumber=${pageNumber}&PageSize=${pageSize}`, null);
  }
}
