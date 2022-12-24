import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../../app/material/material.module';
import { SharedModule } from '../../app/shared/shared.module';


@NgModule({
  declarations: [
    // ListComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ConfigModule { }
