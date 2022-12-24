import { Observable } from "rxjs/internal/Observable";
export abstract class IGlobalization {
    public abstract getAllStates(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getAllCities(pageNumber: number, pageSize: number): Observable<any>;
}
