import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { ListComponent } from './list/list.component';
import { HomeService } from './services/home/home.service';
import { IHome } from './services/contracts';

@NgModule({
  imports: [
    HomePageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    ListComponent
  ],
  providers:[
    {provide:IHome, useClass: HomeService }
  ]
})
export class HomeModule { }
