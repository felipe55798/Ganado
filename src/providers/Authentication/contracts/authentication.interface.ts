import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Response } from 'src/models/httpResponse';
// AbstractFactoryInterface
export abstract class IAuthentication {
    public abstract currentUser: Observable<any>;
    public abstract login<T>(login: any): Observable<Response<T>>;
    public abstract logout(): void;
    public abstract currentUserValue(): Observable<any>;
}