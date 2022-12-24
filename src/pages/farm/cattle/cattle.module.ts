import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CattleRoutingModule } from './cattle-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ProductionComponent } from './production/production.component';
import { BreedingComponent } from './breeding/breeding.component';
import { ZootechnicsComponent } from './zootechnics/zootechnics.component';
import { ICattleType } from 'src/pages/services/contracts/cattleType.interface';
import { CattleTypeService } from 'src/pages/services/cattlesType/cattle-type.service';
import { CattleService } from 'src/pages/services/cattles/cattle.service';
import { ICattle } from 'src/pages/services/contracts/cattle.interface';

@NgModule({
  imports: [
    CattleRoutingModule,
    InputTextModule,
    CommonModule
  ],
  declarations: [
    ProductionComponent,
    BreedingComponent,
    ZootechnicsComponent
    ],
  providers:[
    { provide: ICattleType, useClass: CattleTypeService },
    { provide: ICattle, useClass: CattleService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CattleModule { }