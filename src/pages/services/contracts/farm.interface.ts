import { Observable } from "rxjs/internal/Observable";
import { CattleFarm } from '../../../models/hacienda/cattleFarm';


export abstract class IFarm {
    public abstract getAllWheathers(pageNumber: number, pageSize: number): Observable<any>;
    public abstract updateFarm( farm: CattleFarm ): Observable<any>;
    public abstract getFarmById(idFarm: string): Observable<any>;

}