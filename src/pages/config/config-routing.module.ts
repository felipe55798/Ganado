import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "",
        redirectTo: "catalogs",
      },
      {
        path: "channels",
        loadChildren: () =>
          import("./channels/channels.module").then(
            (m) => m.ChannelsModule
          ),
      },
      {
        path: "charges",
        loadChildren: () =>
          import("./charges/charges.module").then(
            (m) => m.ChargesModule
          ),
      },
      {
        path: "catalogs",
        loadChildren: () =>
          import("./segmentation-catalogs/segmentation-catalogs.module").then(
            (m) => m.SegmentationCatalogsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
