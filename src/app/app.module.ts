import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';

import { Api, Notifications, NavigatorService, ParamsService, BroadcastService, AuthenticationService } from '../providers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { IApi } from '../providers/api/contracts';
import { LayoutComponent } from './layout/layout.component';
import { INavigator } from '../providers/Navigation/contracts';
import { IAuthentication } from 'src/providers/Authentication/contracts/authentication.interface';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationMockService } from 'src/mocks/providers/authentication';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IPen } from 'src/pages/services/contracts/pens.interface';
import PenService from 'src/pages/services/pens/pen.service';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: IApi, useExisting: Api.Api },
    Notifications,
    { provide: INavigator, useExisting: NavigatorService },
    { provide: IAuthentication, useExisting: AuthenticationService },
    ParamsService,
    BroadcastService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue : '/' },
    BnNgIdleService,
    { provide: IPen, useClass: PenService },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
