import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthService } from '../auth/services/authentication/auth.service';
import { IAuth } from '../auth/services/contracts/auth.interface';
import { NavComponent } from './components/nav/nav.component';
import { ConfirmModule } from './components/confirm/confirm.module';
import { ListPaginatedComponent } from './components/list-paginated/list-paginated.component';
import { PaginatorModule } from 'primeng/paginator';





@NgModule({
  declarations: [
    NavComponent,
    SideNavComponent,
    FileChooserComponent,
    ToastComponent,
    ListPaginatedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ConfirmModule,
    PaginatorModule
  ],
  exports:[
    NavComponent,
    SideNavComponent,
    FileChooserComponent,
    ToastComponent,
    ListPaginatedComponent
  ],
  providers:[
    {provide: IAuth, useClass: AuthService }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
