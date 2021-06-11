import { Component, OnInit } from '@angular/core';
import { SalesService } from './services/sales.service';
import { SalesInterface } from './interface/sales';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales: SalesInterface[];
  loading = true;

  constructor(private readonly salesService: SalesService) {
  }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.salesService.getSales().subscribe((result: SalesInterface[]) => {
        this.sales = result;
      }, error => this.loading = false,
      () => {
        this.loading = false;
      }
    );
  }


}
