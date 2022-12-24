import { Component, Injector, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private navegationService: Contracts.INavigator,
  ) {
  }

  ngOnInit() {
    // this.service.getHome()
  }

  goTo(page:string, id?:string) {
    if(id){
      this.navegationService.Push([page,id],page)
    }
    else{
      this.navegationService.Push([page],page);
    }
  }

}
