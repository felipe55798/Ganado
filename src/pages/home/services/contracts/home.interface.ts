import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { HomeService } from '../home/home.service';

// AbstractFactoryInterface
export abstract class IHome {
    public abstract getHome(): Observable<any>;
}

