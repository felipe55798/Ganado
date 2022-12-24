import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ParamsService } from '../Params'
import { INavigator } from '../contracts/navigator.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService implements INavigator{

  constructor(private paramsService:ParamsService, private navCtrl:Router, private location:Location) { }

  public Push(commands:any[], page:string, params:any = null){
    if(params != null && params != undefined){
      this.paramsService.Set(page,params);
    }

    this.navCtrl.navigate(commands);
  }

  public Pop(){
    return this.location.back();
  }
}
