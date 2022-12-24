import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginModel } from '../../models/login/login';
import { Response } from '../../models/httpResponse';
import { Api } from '../api/api';
import { BroadcastService } from '../Broadcast';
import { IAuthentication } from './contracts/authentication.interface';
import { Microservices } from 'src/models/enums/microservices';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements IAuthentication{
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private broadcastService:BroadcastService, private api: Api) {
        api.setGateway("Security");
        if(localStorage?.getItem('currentUser')){
            this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage?.getItem('currentUser') || ""));
        }else{
            this.currentUserSubject = new BehaviorSubject<any>("");
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login<T>(login:LoginModel) {
        return this.api.post<Response<any>>("Account/authenticate", login,null)
            .pipe(map((response:any) => {
                // login successful if there's a jwt token in the response
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    this.currentUserSubject.next(response.data);
                    this.broadcastService.Auth(true);
                }
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}