import { Observable } from "rxjs/internal/Observable";

export abstract class ICattleType {
    public abstract getCattleTypeByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract getCattleByType(pageNumber: number, pageSize: number, idCattleType: string): Observable<any>;
}