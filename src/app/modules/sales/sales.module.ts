import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { AppModule } from '../../app.module';
import { MatButtonModule } from '@angular/material/button';
import { SalesService } from './services/sales.service';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [SalesService]
})
export class SalesModule {
}
