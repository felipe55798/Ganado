import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-zootechnics',
  templateUrl: './zootechnics.component.html',
  styleUrls: ['./zootechnics.component.scss']
})
export class ZootechnicsComponent implements OnInit {

  pathbase = "pages/farm/cattle/zootechnics"
  constructor(
    private navegationService: Contracts.INavigator,
  ) {
   }

  ngOnInit() {
  }

  goTo(page:string, id?:string) {
    if(id){
      this.navegationService.Push([this.pathbase,page,id], page)
    }
    else{
      this.navegationService.Push([this.pathbase,page],page);
    }
  }

}
