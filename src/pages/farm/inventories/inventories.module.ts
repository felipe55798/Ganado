import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { InventoriesRouting } from './inventories-routing.module';
import { KardexComponent } from './kardex/kardex.component';

@NgModule({
  imports: [
    InventoriesRouting,
    InputTextModule,
    TabViewModule
  ],
  declarations: [
    KardexComponent
    ],
  providers:[
  ]
})
export class InventoriesModule { }