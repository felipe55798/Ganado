import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ISponsor } from '../contracts/sponsor.interface';
import { environment } from 'src/environments/environment';
import { Sponsor } from 'src/models/hacienda/sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService implements ISponsor {

  microservicio = `${environment.api}/CattleFairs/api/v1/`;
  constructor(private http: HttpClient) { }

  public getAllSponsorsByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.microservicio}Sponsors?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public createSponsor(sponsor: Sponsor){
    return this.http.post<Sponsor>(`${this.microservicio}Sponsors`, sponsor);
  }
  public updateSponsor(sponsor: Sponsor){
    return this.http.put<Sponsor>(`${this.microservicio}Sponsors/${sponsor.id}`, sponsor);
  }
  public deleteSponsor(sponsorId: string): Observable<any> {
    return this.http.delete<any>(`${this.microservicio}Sponsors/${sponsorId}`);
  }
}
