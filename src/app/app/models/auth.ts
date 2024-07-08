import { DB } from './db';
import { Constants } from 'src/app/config/constants';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private static isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    Auth.isBrowser = isPlatformBrowser(platformId);
  }

  /**
  * Get user data.
  * @returns Object
  */
  public static user(): any {
    if (Auth.isBrowser) {
      return DB.get('user') ?? {};
    }
    return {};
  }

  /**
  * Store API token in storage.
  * @param token
  * @returns boolean
  */
  public static login(token: any): boolean {
    if (Auth.isBrowser) {
      DB.set('api_token', { token: token });
    }
    return true;
  }
  /**
   * Get API token of auth user.
   * @returns string
   */
  public static getApiToken(): string | undefined {
    if (Auth.isBrowser) {
      return DB.get('api_token')?.token;
    }
    return '';
  }

  /**
     * Clear session data for the user.
     * @param platformId - Platform ID injection for SSR
     * @returns boolean
     */
  public static logout(platformId: Object): boolean {
    if (isPlatformBrowser(platformId)) {
      DB.remove('api_token');
      DB.remove('user');
      // Handle redirection or other server-side actions in SSR context
    }
    return true;
  }

  /**
   * Get common settings of user business.
   * @returns object
   */
  public static commonSettings(): any {
    if (Auth.isBrowser) {
      return DB.get('commonSettings') ?? {};
    }
    return {};
  }

  /**
   * Get application local language.
   * @returns string [ar, en]
   */
  public static locale(): string {
    if (Auth.isBrowser) {
      return DB.get('lang') ?? Constants.LANG;
    }
    return Constants.LANG; // Return default language in SSR context
  }

  /**
   * log any action for the user
   * @param data
   */
  public static log(data: any) {
    // Implement logging functionality here if needed
  }

  /**
   * Set application locale and adjust stylesheet based on language.
   * @param lang Language code ('ar' for Arabic, 'en' for English)
   */
  public static setLocale(lang: any): void {
    if (Auth.isBrowser) {
      var link = document.createElement('link');
      var doc: any = document;

      // remove old links
      doc
        .querySelector('head')
        .querySelectorAll('.locale-link')
        .forEach((elem: any) => elem.remove());

      link.rel = 'stylesheet';
      link.className = 'locale-link';
      DB.set('lang', lang);
      if (lang === 'ar') {
        link.href = '/assets/css/bootstrap.rtl.min.css';
        doc.querySelector('html').setAttribute('dir', 'rtl');
      } else {
        link.href = '/assets/css/bootstrap.min.css';
        doc.querySelector('html').setAttribute('dir', 'ltr');
      }

      doc.querySelector('head').prepend(link);
    }
  }
}
