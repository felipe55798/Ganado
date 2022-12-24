import { Observable } from "rxjs/internal/Observable";
import { Sponsor } from "src/models/hacienda/sponsor";
export abstract class ISponsor {
    public abstract getAllSponsorsByPage(pageNumber: number, pageSize: number): Observable<any>;
    public abstract createSponsor( sponsor: Sponsor ): Observable<any>;
    public abstract updateSponsor( sponsor: Sponsor ): Observable<any>;
    public abstract deleteSponsor( sponsorId: string ): Observable<any>;    
}
