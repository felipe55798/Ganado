import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

// AbstractFactoryInterface
export abstract class INavigator {
    public abstract Push<T>(commands:any[], page: string, params?: any): void;
    public abstract Pop<T>(): void;
}