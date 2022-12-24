import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FarmComponent } from './farm.component';
import { FarmRoutingModule } from './farm-routing.module';
import { AdminComponent } from './admin/admin.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CattleComponent } from './cattle/cattle.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { MarketPlaceComponent } from './marketPlace/marketPlace.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'primeng/button';
import { ICattle } from '../services/contracts/cattle.interface';
import { CattleService } from '../services/cattles/cattle.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFarm } from '../services/contracts/farm.interface';
import { FarmService } from '../services/farms/farm.service';
import { IGlobalization } from '../services/contracts/globalization.interface';
import { GlobalizationService } from '../services/globalization/globalization.service';
import { ILote } from '../services/contracts/lote.interface';
import { LoteService } from '../services/lotes/lote.service';
import { IFair } from '../services/contracts/fair.interface';
import { FairService } from '../services/fairs/fair.service';

@NgModule({
  imports: [
    CommonModule,
    FarmRoutingModule,
    InputTextModule,
    DropdownModule,
    MatListModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [
    FarmComponent,
    AdminComponent,
    CattleComponent,
    InventoriesComponent,
    MarketPlaceComponent,
  ],
  providers: [
    { provide: IGlobalization, useClass: GlobalizationService },
    { provide: ICattle, useClass: CattleService },
    { provide: IFarm, useClass: FarmService },
    { provide: IFair, useClass: FairService },
    { provide: ILote, useClass: LoteService },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FarmModule {}
