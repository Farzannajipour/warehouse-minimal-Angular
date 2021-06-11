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

  // public updateProducts(domainName: string, newStatus: boolean, ProductsKeys?: ProductsKeysInterface[]): Observable<any> {
  //   const updateProductsEndpoint = `${environment.apiBaseURL}/domains/${domainName}/Products`;
  //   if (!ProductsKeys) {
  //     return this.apiService.call$<any>(new ApiRequest('put', updateProductsEndpoint,
  //       {status: (newStatus) ? 'ENABLED' : 'DISABLED'}));
  //   }
  //   return this.apiService.call$<any>(new ApiRequest('put', updateProductsEndpoint,
  //     {status: (newStatus) ? 'ENABLED' : 'DISABLED', ProductsKeys}));
  // }

  public getProducts(): Observable<ProductsInterface> {
    const getProductsEndpoint = `${environment.apiBaseURL}/products`;
    return this.apiService.call$<any>(new ApiRequest('get', getProductsEndpoint));
  }
}
