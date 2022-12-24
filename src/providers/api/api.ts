import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApi } from './contracts/api.interface';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
  providedIn: 'root'
})
export class Api implements IApi {
  private gateway:string = "";
  private url: string = `${environment.api}/api/v${environment.apiVersion}`;
  private constructor(public http: HttpClient) {
  }
  
  public setGateway(gateway:string){
    this.gateway = gateway;
    this.url = `${environment.api}/${this.gateway}/api/v${environment.apiVersion}`;
  }
  get<T>(endpoint: string, params?: any, reqOpts?: any):Observable<T> {
    // console.log("Create Request");
    // let url = this.apiGateway(microservice);
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType:"json"
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.get<T>(`${this.url}/${endpoint}`);
  }

  post<T>(endpoint: string, body: any, reqOpts?: any):Observable<T> {
    // let url = this.apiGateway(microservice);
    return this.http.post<T>(`${this.url}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any, reqOpts?: any):Observable<HttpEvent<T>> {
    // let url = this.apiGateway(microservice);
    return this.http.put<T>(`${this.url}/${endpoint}`, body, reqOpts);
  }

  delete<T>(endpoint: string, reqOpts?: any):Observable<HttpEvent<T>>  {
    // let url = this.apiGateway(microservice);
    return this.http.delete<T>(`${this.url}/${endpoint}`, reqOpts);
  }

  patch<T>(endpoint: string, body: any, reqOpts?: any):Observable<T>  {
    // let url = this.apiGateway(microservice);
    return this.http.patch<T>(`${this.url}/${endpoint}`, body);
  }
}
