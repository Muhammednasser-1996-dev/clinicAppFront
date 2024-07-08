import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth } from 'src/app/app/models/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let appToken = '';

    if (this.isBrowser) {
      const doc: any = this.document;
      appToken = doc.appToken || '';
    }

    const token = Auth.getApiToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + token)
          .set('app-token', appToken),
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
