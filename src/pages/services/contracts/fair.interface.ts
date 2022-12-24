import { Observable } from "rxjs/internal/Observable";
import { Fair } from "src/models/hacienda/fair";
export abstract class IFair {
    public abstract getAllFairs(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getAllSchedules(pageNumber: number, pageSize: number): Observable<any>;
    public abstract createFair( fair: Fair ): Observable<any>;
    public abstract updateFair( fair: Fair ): Observable<any>;
    public abstract deleteFair( penId: string ): Observable<any>;
}
