import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.scss']
})
export class FairComponent implements OnInit {
  pathbase = "pages/fair";

  constructor(private navegationService: Contracts.INavigator) { }

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
