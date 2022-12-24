import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { CatalogsService } from '../catalogs/catalogs.service';

// AbstractFactoryInterface
export abstract class ICatalogs {
    public abstract getCatalogs(): Observable<any>;
    public abstract createCatalog(catalog: any): Observable<any>;
    public abstract getCatalogByID(idCatalog: number): Observable<any>;
    // public abstract getCatalogEnabledById(idCatalog: number): Observable<any>;
    public abstract editCatalog(catalog: any): Observable<any>;
    public abstract deleteCatalog(idCatalog: number): Observable<any>;
    public abstract deleteValueOfCatalog(Value: number): Observable<any>;
    public abstract updateCatalog(catalog: any): Observable<any>;
}
