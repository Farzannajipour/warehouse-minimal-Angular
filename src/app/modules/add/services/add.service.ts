import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { environment } from '../../../../environments/environment';
import { ApiRequest } from '../../../core/services/api/api-request';


@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private readonly apiService: ApiService) {
  }

  public postSales(productAndAmountSold): Observable<any> {
    const endpoint = `${environment.apiBaseURL}/sales`;
    return this.apiService.call$<any>
    (new ApiRequest('post', endpoint, productAndAmountSold));
  }
}
