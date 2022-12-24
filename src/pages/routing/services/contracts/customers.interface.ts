import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
//import { CatalogsService } from '../catalogs/catalogs.service';

// AbstractFactoryInterface
export abstract class ICustomers {
    public abstract uploadCustomers(customer: any): Observable<any>;
}
