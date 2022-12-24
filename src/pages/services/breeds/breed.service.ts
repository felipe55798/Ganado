import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBreed } from '../contracts/breed.interface';
import { Breed } from 'src/models/hacienda/breed';

@Injectable({
  providedIn: 'root'
})
export class BreedService implements IBreed {

  microservicio = `${environment.api}/CattleRaising/api/v1/`;
  constructor(private http: HttpClient) { }

  public getAllBreedsByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.microservicio}Breeds?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  public createBreed(breed: Breed){
    return this.http.post<Breed>(`${this.microservicio}Breeds`, breed);
  }
  public updateBreed(breed: Breed){
    return this.http.put<Breed>(`${this.microservicio}Breeds/${breed.id}`, breed);
  }
  public deleteBreed(breedId: string): Observable<any> {
    return this.http.delete<any>(`${this.microservicio}Breeds/${breedId}`);
  }
}
