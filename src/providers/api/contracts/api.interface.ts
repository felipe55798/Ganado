import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Microservices } from "src/models/enums/microservices";

// AbstractFactoryInterface
export abstract class IApi {
    public abstract get<T>(endpoint: string, params?: any, reqOpts?: any): Observable<T>;
    public abstract post<T>(endpoint: string, body: any, reqOpts?: any): Observable<T>;
    public abstract put<T>(endpoint: string, body: any, reqOpts?: any): Observable<HttpEvent<T>>;
    public abstract delete<T>(endpoint: string, reqOpts?: any): Observable<HttpEvent<T>>;
    public abstract patch<T>(endpoint: string, body: any, reqOpts?: any): Observable<T>;
    public abstract setGateway(nameMicroservice: string): void;
}