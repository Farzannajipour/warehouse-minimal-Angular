import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { environment } from '../../../../environments/environment';
import { ApiRequest } from '../../../core/services/api/api-request';
import { SalesInterface } from '../interface/sales';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly apiService: ApiService) {
  }


  public getSales(): Observable<SalesInterface[]> {
    const getProductsEndpoint = `${environment.apiBaseURL}/sales`;
    return this.apiService.call$<any>(new ApiRequest('get', getProductsEndpoint));
  }
}
