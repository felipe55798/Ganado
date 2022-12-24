import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Microservices } from 'src/models/enums/microservices';
import { Response } from 'src/models/httpResponse';
import { Contracts } from 'src/providers/api';
import { IAuthentication } from 'src/providers/Authentication/contracts/authentication.interface';
import { IAuth } from '../contracts/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuth{

  constructor(private authentication :IAuthentication,
    private api:Contracts.IApi) { }
  public login<T>(login: any): Observable<Response<T>> {
    this.api.setGateway("Security");
    return this.authentication.login(login);
  }
  public logout(): void {
    this.authentication.logout();
  }

  public updatePassword(passwords: any, idUser: number){
    return this.api.put<any>(`auth/users/${idUser}/update-password/`, passwords);
  }
}
