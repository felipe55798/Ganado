import { Observable } from "rxjs/internal/Observable";

export abstract class ILote {
    public abstract getLotesByPage(pageNumber: number, pageSize: number): Observable<any>;
}