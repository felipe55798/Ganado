import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private globalParams:any = {};

  constructor() { }

  public Get(page:string, key:string){
    // console.log("globalparams: ", this.globalParams);
    // console.log(`page: ${page}. key:${key}`)
    return (this.globalParams[page] == undefined)? "" : this.globalParams[page][key];

  }

  public Set(page:string, params:any){
    // console.log(`page: ${page}. params:${params}`)
    if(this.globalParams[page] == undefined){
      this.globalParams[page] = {};
    }

    var keys = Object.keys(params);

    keys.forEach(key => {
      this.globalParams[page][key] = params[key];
    })
  }

}
