import { Observable } from "rxjs/internal/Observable";

// AbstractFactoryInterface
export abstract class ICharge {
    public abstract getCharges(): Observable<any>;
    public abstract createCharge(catalog: any): Observable<any>;
    public abstract getChargeByID(idCatalog: number): Observable<any>;
    public abstract editCharge(catalog: any): Observable<any>;
    public abstract deleteCharge(idCatalog: number): Observable<any>;
    public abstract getZoneTypes(): Observable<any>;
    public abstract getCombinationsByCharge(idCharge: number): Observable<any>;
    public abstract getFrecuencies(): Observable<any>;
}