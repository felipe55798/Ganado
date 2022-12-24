import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contracts } from 'src/providers/api';
import { ICatalogs } from '../contracts/catalogs.interface';
import { Parameter } from 'src/pages/config/models/catalog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService implements ICatalogs{


  constructor(private api:Contracts.IApi,) {
  }

  public getCatalogByID(idCatalog: number): Observable<Parameter> {
    return this.api.get<Parameter>(`catalogs/parameters/${idCatalog}`);
  }
  public getCatalogs():Observable<any>{
    return this.api.get<any>("catalogs/parameters");
  }
  public createCatalog(catalog: Parameter){
    return this.api.post<any>("catalogs/parameters/", catalog);
  }
  public editCatalog(catalog: Parameter): any {
    return this.api.put<any>(`catalogs/parameters/${catalog.id}/`, catalog);
  }

  public deleteCatalog(idCatalog: number): Observable<any> {
    return this.api.delete<any>(`catalogs/parameters/${idCatalog}`);
  }

  public deleteValueOfCatalog(idValue: number){
    return this.api.delete<any>(`catalogs/parameters/delete_value/${idValue}/`);
  }

  public updateCatalog(catalog: Parameter): any {
    return this.api.patch<any>(`catalogs/parameters/${catalog.id}/`, catalog);
  }


  // public getCatalogEnabledById(idCatalog: number): Observable<any> {
  //   return this.api.get<any>(`catalogs/parameters/${idCatalog}`)
  //   .pipe(map(res=> {return res.data.values}));
  // }
}
