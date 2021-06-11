import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequest } from './api-request';
import { delay, filter, retryWhen, share, take } from 'rxjs/operators';
import { HttpError } from '../../interfaces/http-error/http-error.interface';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/message.constants';
import { HTTP_STATUS } from '../../constants/http-code.constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  processedError: HttpError;

  constructor(
    protected readonly http: HttpClient) {
  }

  call$<T>(req: ApiRequest, impersonationHeaders = true, rawResponse = false): Observable<T> {
    // Add some useful headers
    req.addHeader('Content-Type', 'application/json');
    req.addHeader('Accept', 'application/json');

    // Create and return an observable with the processed response, added delay and take for retrying the request
    const obs$ = new Observable<object | HttpResponse<any>>((observer) => {
      this.http.request(req.getRequest())
        .pipe(
          filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
        )
        .subscribe(
          (response: HttpResponse<any>) => {
            // Return the raw response, if needed, or only the body
            observer.next((rawResponse) ? response : response.body);
          },
          (error) => {
            console.log(error);
            if (error.status === HTTP_STATUS.SERVICE_UNAVAILABLE) {
              retryWhen(errors => errors.pipe(delay(500), take(10)));
            }
            observer.error(this.handleError(error));
          },
          () => {
            observer.complete();
          }
        );
    });

    return obs$.pipe(share()) as Observable<T>;
  }

  handleError(error): HttpError {
    this.processedError = {
      statusCode: error.status,
      errorDetails: error.error
    };

    switch (error.status) {
      case 500:
      case 503:
        this.processedError.errorDetails.message = DEFAULT_ERROR_MESSAGE;
        break;
      default:
        if (!this.processedError.errorDetails) {
          this.processedError.errorDetails.message = DEFAULT_ERROR_MESSAGE;
        }
        break;
    }
    return this.processedError;
  }

}
