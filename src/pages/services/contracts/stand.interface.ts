import { Observable } from "rxjs/internal/Observable";
export abstract class IStand {
    public abstract getAllStands(pageNumber: number, pageSize: number): Observable<any>;
}
