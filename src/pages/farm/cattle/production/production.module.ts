import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { ProductionRouting } from './production-routing.module';
import { DairyComponent } from './dairy/dairy.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { MeatComponent } from './meat/meat.component';
import { ReproductionComponent } from './reproduction/reproduction.component';

@NgModule({
  imports: [
    ProductionRouting,
    InputTextModule,
    TabViewModule
  ],
  declarations: [
    DairyComponent,
    ExhibitionComponent,
    MeatComponent,
    ReproductionComponent
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductionModule { }