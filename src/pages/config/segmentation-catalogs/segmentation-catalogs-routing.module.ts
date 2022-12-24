import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  { path: "detail", component: CatalogComponent},
  { path: "", component: CatalogsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentationCatalogsRoutingModule { }
