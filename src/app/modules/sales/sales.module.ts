import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { AppModule } from '../../app.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatButtonModule
  ]
})
export class SalesModule { }
