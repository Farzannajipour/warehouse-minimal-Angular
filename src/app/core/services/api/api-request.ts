import { HttpHeaders, HttpRequest } from '@angular/common/http';


export class ApiRequest {

  private readonly methodName: string;
  private readonly urlAddress: string;
  private headersObject: HttpHeaders;
  private readonly queryParams: object;
  private bodyObject: any;

  constructor(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    body: any = {}
  ) {
    this.methodName = method.toUpperCase();
    this.bodyObject = body;
    this.headersObject = new HttpHeaders();
    this.urlAddress = path;
    this.queryParams = {};
  }

  set body(value: any) {
    this.bodyObject = value;
  }

  get method(): string {
    return this.methodName;
  }

  get url(): string {
    return this.urlAddress;
  }

  addQueryStringParam(key: string, value: number | string): ApiRequest {
    if (key.trim().length) {
      this.queryParams[key] = value;
    } else {
      throw new Error(`Invalid key: ${key}`);
    }
    return this;
  }

  addQueryStringParams(params: object): ApiRequest {
    Object.keys(params).map((K: string) => {
      this.addQueryStringParam(K, params[K]);
    });
    return this;
  }

  addHeader(key: string, value: string): ApiRequest {
    if (key.trim().length) {
      this.headersObject = this.headersObject.set(key, value);
    } else {
      throw new Error(`Invalid key: ${key}`);
    }
    return this;
  }

  addHeaders(headers: object): ApiRequest {
    if (headers !== null && typeof headers === 'object') {
      Object.keys(headers).map((K: string) => {
        this.addHeader(K, headers[K]);
      });
    }
    return this;
  }

  getRequest(): HttpRequest<any> {
    // Compose query string
    const queryString = [];
    for (const key of Object.keys(this.queryParams)) {
      queryString.push(`${key}=${this.queryParams[key]}`);
    }

    // Compose api url
    let url = this.urlAddress;

    if (queryString.length) {
      url += '?' + queryString.join('&');
    }

    // Compose request options
    const options = {
      headers: this.headersObject
    };

    return new HttpRequest(this.methodName, url, this.bodyObject, options);
  }
}
