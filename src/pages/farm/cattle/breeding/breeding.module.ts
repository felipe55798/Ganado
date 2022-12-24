import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { BreedingRoutingModule } from './breeding-routing.module';
import { DevelopmentComponent } from './development/development.component';
import { DietComponent } from './diet/diet.component';

@NgModule({
  imports: [
    BreedingRoutingModule,
    InputTextModule,
    TabViewModule
  ],
  declarations: [
    DietComponent,
    DevelopmentComponent,
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class BreedingModule { }