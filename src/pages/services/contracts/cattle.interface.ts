import { Observable } from "rxjs/internal/Observable";
import { Cattle } from "src/models/hacienda/cattle";

export abstract class ICattle {
    public abstract getAllCattlesByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract createCattle( cattle: Cattle ): Observable<any>;
    public abstract updateCattle( cattle: Cattle ): Observable<any>;
    public abstract deleteCattle( penId: string ): Observable<any>;
}