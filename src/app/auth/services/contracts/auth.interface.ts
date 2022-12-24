import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Response } from "src/models/httpResponse";
// AbstractFactoryInterface
export abstract class IAuth {
    public abstract login<T>(login: any): Observable<Response<T>>;
    public abstract logout(): void;
    public abstract updatePassword(passwords: any, idUser: number): Observable<any>;
}