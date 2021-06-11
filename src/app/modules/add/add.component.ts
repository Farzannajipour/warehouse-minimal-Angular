import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsInterface } from '../products/interface/products';
import { ProductsService } from '../products/services/products.service';

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
  products: ProductsInterface[];

  constructor(
    private readonly formBuilder: FormBuilder, private readonly productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getProducts();
  }

  createForm(): void {
    this.salesForm = this.formBuilder.group({
      product: ['', Validators.required],
      amountSold: ['', Validators.required]
    });
  }


  onSubmit(): void {
    console.log(this.salesForm.value);
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


export const NAMES = ['pickclosest'];
