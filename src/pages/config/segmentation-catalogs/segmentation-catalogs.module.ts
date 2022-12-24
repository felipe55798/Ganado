import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentationCatalogsRoutingModule } from './segmentation-catalogs-routing.module';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { MaterialModule } from '../../../app/material/material.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { ICatalogs } from './services/contracts/catalogs.interface';
import { CatalogsService } from './services/catalogs/catalogs.service';
import { ListModule } from '../list/list.module';


@NgModule({
  declarations: [
    CatalogsComponent,
    FormComponent,
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    SegmentationCatalogsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListModule,
  ],
  providers:[
    {provide: ICatalogs, useClass: CatalogsService }
  ]
})
export class SegmentationCatalogsModule { }
