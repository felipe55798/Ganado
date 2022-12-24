import { Observable } from "rxjs/internal/Observable";

// AbstractFactoryInterface
export abstract class ICombination {
    // public abstract getCombinations(): Observable<any>;
    public abstract createCombination(combination: any): Observable<any>;
    // public abstract getCombinationByID(idCombination: number): Observable<any>;
    public abstract editCombination(combination: any, positionid: number): Observable<any>;
    public abstract deleteCombination(idCatalog: number, idCombination: number): Observable<any>;
}