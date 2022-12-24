import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.scss']
})
export class BreedingComponent implements OnInit {
  pathbase = "pages/farm/cattle/breeding"
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
