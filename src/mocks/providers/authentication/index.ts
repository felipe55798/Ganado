import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from 'src/models/login/login';
import { BroadcastService } from 'src/providers';
import { IAuthentication } from 'src/providers/Authentication/contracts/authentication.interface';
import { Response } from "src/models/httpResponse";

@Injectable({ providedIn: 'root' })
export class AuthenticationMockService implements IAuthentication{
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private broadcastService:BroadcastService) {
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
        let _authSuccess: Subject<Response<T>> = new Subject();
        let AuthSuccess = _authSuccess.asObservable();

        let result = new Response<any>({

        });

        if(login.email === "asd@asd.com" && login.password === "Asd123456!"){
            result.succeeded = true;
            result.data = {
                temporal_password:false
            }
        }else{
            result.succeeded = false;
            result.message = "Datos incorrectos";
        }

        setTimeout(()=>{
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            this.currentUserSubject.next(result.data);
            this.broadcastService.Auth(true);
            _authSuccess.next(result);
        },3000);

        return AuthSuccess;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    miMetodo(){
        //lo que sea...
    }
}