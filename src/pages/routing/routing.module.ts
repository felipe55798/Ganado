import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingRoutingModule } from './routing-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../../app/material/material.module';
import { SharedModule } from '../../app/shared/shared.module';


@NgModule({
  declarations: [
    // ListComponent
  ],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class RoutingModule { }
