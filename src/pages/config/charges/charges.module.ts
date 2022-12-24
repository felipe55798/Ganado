import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesComponent } from './charges/charges.component';
import { DetailChargeComponent } from './detail-charge/detail-charge.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ListModule } from '../list/list.module';
import { ICharge } from './services/contracts/charge.interface';
import { ChargeService } from './services/charges/charge/charge.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CombinationComponent } from './combination/combination.component';
import { ListCheckParametersComponent } from './list-check-parameters/list-check-parameters.component';
import { CatalogsService } from '../segmentation-catalogs/services/catalogs/catalogs.service';
import { ICatalogs } from '../segmentation-catalogs/services/contracts/catalogs.interface';
import { ICombination } from './services/contracts/combination.interface';
import { CombinationService } from './services/charges/combination/combination.service';


@NgModule({
  declarations: [
    ChargesComponent,
    DetailChargeComponent,
    FormComponent,
    CombinationComponent,
    ListCheckParametersComponent
  ],
  imports: [
    CommonModule,
    ChargesRoutingModule,
    SharedModule,
    MaterialModule,
    ListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    {provide: ICharge, useClass: ChargeService },
    {provide: ICatalogs, useClass: CatalogsService },
    {provide: ICombination, useClass: CombinationService }
  ]
})
export class ChargesModule { }
