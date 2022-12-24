import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-cattle',
  templateUrl: './cattle.component.html',
  styleUrls: ['./cattle.component.scss']
})
export class CattleComponent implements OnInit {
  pathbase = "pages/farm/cattle"
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
