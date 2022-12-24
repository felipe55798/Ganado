import { Component, OnInit } from '@angular/core';
import { Contracts } from 'src/providers/Navigation';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  pathbase = "pages/farm/cattle/zootechnics/appointment"
  constructor(
    private navegationService: Contracts.INavigator,
  ) { }

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
