import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from 'src/app/app/models/auth';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (this.isBrowser && error.error instanceof ErrorEvent) {
            // Handle client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Handle server-side error or non-browser environment
            if (error.status === 401 && this.isBrowser) {
              Auth.logout(PLATFORM_ID);
              this.router.navigate(['/login']);
            }
          }
          return throwError(error);
        })
      );
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
