import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/app/models/auth';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  doc: any;
  public $: any;
  header: HttpHeaders;
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const apiToken = Auth.getApiToken() ?? ''; // Provide a default empty string if undefined
    this.header = new HttpHeaders({
      'content-type': 'application/json',
      api_token: apiToken, // Use the variable with a guaranteed string value
      Authorization: 'Bearer ' + apiToken, // Use the variable with a guaranteed string value
    });
    if (this.isBrowser) {
      this.doc = this.document;
      this.$ = this.doc.$;
    }
  }

  /**
   * get services from api
   *
   */
  public get(url: any, data: any = {}) {
    let requestParams: any = {};

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        requestParams[key] = data[key];
      }
    });

    let queryString = '';
    if (this.isBrowser && this.$) {
      queryString = '?' + this.$.param(data);
    } else {
      // Fallback for server-side: manually construct query string
      queryString = '?' + new URLSearchParams(requestParams).toString();
    }

    let headerOptions: any = {
      headers: this.header,
      params: requestParams,
    };

    return this.http.get(url + queryString);
  }

  /**
   * get services from api
   *
   */
  loadHtml(url: any, data: any = {}) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
      Authorization: 'Bearer ' + Auth.getApiToken(),
    });
    return this.http.get<string>(url, {
      headers: headers,
      params: data,
      responseType: 'text' as 'json',
    });
  }

  /**
   * get services from api
   *
   */
  loadHtmlPost(url: any, data = {}) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
      Authorization: 'Bearer ' + Auth.getApiToken(),
    });
    return this.http.post<string>(url, data, {
      headers: headers,
      responseType: 'text' as 'json',
    });
  }

  /**
   * store new service
   */
  public store(url: any, data: any = {}, option: any = {}) {
    let headerOptions: any = {
      headers: this.header,
    };
    return this.http.post(url, data);
  }

  public getCities(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + Auth.getApiToken(),
    });

    return this.http.get('cities');
  }

  /**
   * update service
   */
  public update(url: any, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
      Authorization: 'Bearer ' + Auth.getApiToken(),
    });
    return this.http.post(url, data);
  }

  /**
   * remove service
   */
  public destroy(url: any, id: any) {
    let headerOptions: any = {
      headers: this.header,
    };
    return this.http.post(url + '/' + id, null);
  }
}
