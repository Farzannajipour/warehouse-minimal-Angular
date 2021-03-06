import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { environment } from '../../../../environments/environment';
import { ApiRequest } from '../../../core/services/api/api-request';
import { ProductsInterface } from '../interface/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly apiService: ApiService) {
  }

  public getProducts(): Observable<ProductsInterface[]> {
    const getProductsEndpoint = `${environment.apiBaseURL}/products`;
    return this.apiService.call$<any>(new ApiRequest('get', getProductsEndpoint));
  }
}
