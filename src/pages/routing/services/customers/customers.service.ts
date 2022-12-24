import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contracts } from 'src/providers/api';
import { ICustomers } from '../contracts/customers.interface';

//Temporary
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Microservices } from 'src/models/enums/microservices';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ICustomers {

  constructor(private api:Contracts.IApi, private http: HttpClient) {
  }

  public uploadCustomers(customer: any): Observable<any> {
    return this.api.post<any>("routes/customers/upload/", customer, null);
  }


}
