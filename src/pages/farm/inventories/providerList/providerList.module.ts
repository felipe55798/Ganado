import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ProviderListRoutingModule } from './providerList-routing.module';

@NgModule({
  imports: [
    ProviderListRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProviderListModule { }