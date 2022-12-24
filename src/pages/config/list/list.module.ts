import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [ListComponent]
})
export class ListModule { }
