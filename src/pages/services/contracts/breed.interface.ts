import { Observable } from "rxjs/internal/Observable";
import { Breed } from "src/models/hacienda/breed";
export abstract class IBreed {
    public abstract getAllBreedsByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract createBreed( breed: Breed ): Observable<any>;
    public abstract updateBreed( breed: Breed ): Observable<any>;
    public abstract deleteBreed( breedId: string ): Observable<any>;
}
