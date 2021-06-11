import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { ProductsInterface } from './interface/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  panelOpenState = true;
  products: ProductsInterface;

  constructor(private readonly productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(result => {
        console.log(result);
        this.products = result;
      }, error => console.log(error),
      () => {
        // Complete request
      }
    );
  }

}
