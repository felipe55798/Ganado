import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {
  pathbase = "pages/farm";
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
