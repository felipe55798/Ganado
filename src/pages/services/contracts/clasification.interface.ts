import { Observable } from "rxjs/internal/Observable";
import { Clasification } from "src/models/hacienda/clasification";
export abstract class IClasificacion {
    public abstract getAllClasificationsByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract createClasification( clasification: Clasification ): Observable<any>;
    public abstract updateClasification( clasification: Clasification ): Observable<any>;
    public abstract deleteClasification( clasificationId: string ): Observable<any>;
}
