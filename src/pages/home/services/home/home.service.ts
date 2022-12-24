import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IHome } from '../contracts/home.interface';
import { Contracts } from '../../../../providers/api';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements IHome {
  constructor(private api:Contracts.IApi, private injector:Injector) {
  }

  public getHome():Observable<any>{
    return this.api.get<any>("");
  }
}
