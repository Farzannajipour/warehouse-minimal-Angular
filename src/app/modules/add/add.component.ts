import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsInterface } from '../products/interface/products';
import { ProductsService } from '../products/services/products.service';
import { AddService } from './services/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  submitted = false;
  salesForm: FormGroup;
  defaultProduct = '';
  loading = true;
  success = false;
  products: ProductsInterface[];

  constructor(
    private readonly formBuilder: FormBuilder, private readonly productsService: ProductsService, private readonly add: AddService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getProducts();
  }

  createForm(): void {
    this.salesForm = this.formBuilder.group({
      productId: ['', Validators.required],
      amountSold: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.add.postSales(this.salesForm.value).subscribe(
      () => {
        this.success = true;
      }, error => {
        this.salesForm.reset();
      }, () => this.salesForm.reset()
    );
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((result: ProductsInterface[]) => {
        this.products = result;
        if (this.products.length) {
          this.defaultProduct = this.products[0].id;
        }
      }, error => this.loading = false,
      () => {
        this.loading = false;
      }
    );
  }
}

