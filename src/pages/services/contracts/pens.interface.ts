import { Observable } from "rxjs/internal/Observable";
import { Pen } from "src/models/hacienda/pen";

export abstract class IPen {
    public abstract getPensByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getGrassTypes(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getLandTypes(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getGroups(pageNumber: number, pageSize: number): Observable<any>;   
    public abstract createPen( pen: Pen ): Observable<any>;
    public abstract updatePen( pen: Pen ): Observable<any>;
    public abstract deletePen( penId: string ): Observable<any>;

}