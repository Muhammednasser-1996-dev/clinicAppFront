import { DB } from '../models/db';
import * as moment from 'moment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../models/auth';
import { Constants } from '../../config/constants';
import { LANG } from 'src/app/config/lang';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Util {
  private static isBrowser: boolean;
  private static doc: any;
  static $: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    Util.isBrowser = isPlatformBrowser(platformId);
    Util.doc = this.document;
  }

  /**
   * Check if the current environment is a mobile device.
   * @returns boolean
   */
  public static isMobile(): boolean {
    if (Util.isBrowser && typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      );
    }
    return false;
  }

  /**
   * Copy text to clipboard.
   * @param text Text to copy
   */
  public static copyText(text: any): void {
    if (Util.isBrowser) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard');
          // Optionally, you can show a success message or perform other actions
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          // Handle errors, show a message, or fallback to older methods
        });
    }
  }

  /**
   * Return templates of dates [from, to] used in filtering.
   * @returns Array of date templates
   */
  public static getDatesTemplates(): any[] {
    const dates = [
      {
        text: Util.trans('All'),
        dates: [null, null],
      },
      {
        text: Util.trans('Today'),
        dates: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      },
      {
        text: Util.trans('Yesterday'),
        dates: [
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
        ],
      },
      {
        text: Util.trans('Last 7 Days'),
        dates: [
          moment().subtract(6, 'days').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        ],
      },
      {
        text: Util.trans('Last 30 Days'),
        dates: [
          moment().subtract(29, 'days').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        ],
      },
      {
        text: Util.trans('This Month'),
        dates: [
          moment().startOf('month').format('YYYY-MM-DD'),
          moment().endOf('month').format('YYYY-MM-DD'),
        ],
      },
      {
        text: Util.trans('Last Month'),
        dates: [
          moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
        ],
      },
    ];

    return dates;
  }

  /**
   * Convert English digits to Arabic digits.
   * @param string Input string
   * @returns Transformed string with Arabic digits
   */
  public static toArDigits(string: any): string {
    return string ? string.replace(/\d/g, (d: any) => '٠١٢٣٤٥٦٧٨٩'[d]) : '';
  }

  /**
   * Choose a random background color class.
   * @returns Random background color class
   */
  public static randBgColor(): string {
    const bgClass = [
      'w3-red', 'w3-blue', 'w3-pink', 'w3-orange', 'w3-deep-orange',
      'w3-purple', 'w3-indigo', 'w3-teal', 'w3-green', 'w3-lime',
      'w3-sand', 'w3-khaki', 'w3-amber', 'w3-blue-gray', 'w3-brown',
      'w3-dark-gray'
    ];
    const randIndex = Math.floor(Math.random() * bgClass.length);
    return bgClass[randIndex] ?? 'w3-dark-gray';
  }

  /**
   * Show a component in a dialog.
   * @param component Component to show
   * @param data Optional data to pass to the dialog
   * @param closeAction Optional action to perform on dialog close
   */
  public static showDialog(
    dialog: MatDialog,
    component: any,
    data: any = {},
    closeAction: any = null
  ): void {
    if (Util.isBrowser) {
      const dialogRef = dialog.open(component, data);
      dialogRef.afterClosed().subscribe((result) => {
        closeAction ? closeAction(result) : null;
      });
    }
  }

  /**
   * Generate a random ID for transactions.
   * @returns Generated ID
   */
  public static generateId(): string {
    return Util.randString(20);
  }

  /**
   * Reload an Angular component.
   * @param router Angular router service
   * @param url URL to navigate to after reload
   * @param id Optional ID for navigation
   * @param query Optional query parameters
   * @param state Optional navigation state
   */
  public static refreshComponent(
    router: Router,
    url: any,
    id = null,
    query: any = {},
    state: any = null
  ): void {
    router.navigateByUrl('/', { skipLocationChange: true, state: state })
      .then(() => {
        if (id) {
          router.navigate([url, id], { state: state });
        } else {
          router.navigate([url], { queryParams: query, state: state });
        }
      });
  }

  /**
   * Check if a variable is a function.
   * @param functionToCheck Variable to check
   * @returns Boolean indicating if variable is a function
   */
  public static isFunction(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Generate a random string of specified length.
   * @param length Length of the random string
   * @returns Generated random string
   */
  public static randString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Generate a reference number for sales.
   * @returns Generated reference number
   */
  public static generateSellRefNo(): string {
    const ref = moment().format('YYMMDD') + Util.zeroPad(Util.getMaxSellId() + 1, 10000);
    return ref;
  }

  /**
   * Get the maximum ID of sells for the user.
   * @returns Maximum sell ID
   */
  public static getMaxSellId(): number {
    let id 
    if (this.isBrowser) {
      id = DB.get('max_sell_id') ?? DB.get('profile').max_sell_id;
    }
    return parseInt(id);
  }

  /**
   * Pad a number with zeros.
   * @param nr Number to pad
   * @param base Base of the padding
   * @param padding Padding character (default is '0')
   * @returns Padded string
   */
  public static zeroPad(nr: any, base: any, padding: any = '0'): string {
    base = base || 10;
    const len = String(base).length - String(nr).length + 1;
    return len > 0 ? new Array(len).join(padding) + nr : nr;
  }

  /**
   * Translate a word based on current language.
   * @param word Word to translate
   * @returns Translated word
   */
  public static trans(word: any): any {
    try {
      const translations: any = LANG ?? {};
      const lang = Auth.locale() ?? Constants.LANG;
      const preword = word.toString().replace(/\s/g, '_').toLowerCase();
      const directionary = translations[preword] ?? {};
      return directionary[lang] ?? word;
    } catch (error) {
      return word;
    }
  }

  /**
   * Print content using PrintJS.
   * @param content Content to print
   * @param id Optional ID of the print element
   */
  public static print(content: any, id: any = 'printService'): void {
    if (Util.isBrowser && Util.doc) {
      const doc: any = Util.doc;
      if (content != null) doc.$('#' + id).html(content);

      doc.$('#' + id).show();
      doc.printJS({
        printable: id,
        type: 'html',
        css: ['assets/css/w3.css', 'assets/css/bootstrap.min.css'],
      });

      setTimeout(() => {
        doc.$('#' + id).hide();
      }, 500);
    }
  }

  /**
   * Get current datetime in 'YYYY-MM-DD h:mm:ss' format.
   * @returns Formatted datetime string
   */
  public static getCreatedAt(): string {
    return moment().format('YYYY-MM-DD h:mm:ss');
  }

  /**
   * Generate a unique ID based on current timestamp.
   * @returns Unique ID
   */
  public static getId(): number {
    return new Date().getTime();
  }

  /**
   * Convert data to Taffy collection (if available).
   * @param data Data to convert
   * @returns Taffy collection
   */
  public static collect(data: any): any {
    if (Util.isBrowser && Util.doc) {
      const doc: any = Util.doc;
      return doc.TAFFY(data)();
    }
  }

  /**
   * Validate attributes of a given object.
   * @param resource Object to validate
   * @param attributes Attributes to check
   * @param and Boolean indicating AND validation (default true)
   * @returns Validation result
   */
  public static validateObject(
    resource: any,
    attributes: any[] = [],
    and: boolean = true
  ): boolean {
    let valid = true;
    attributes.forEach((attr: any) => {
      if (and) {
        valid = valid && resource[attr];
      } else {
        valid = valid || resource[attr];
      }
    });
    return valid;
  }

  /**
   * Detect if the scroll of an HTML element has reached the end.
   * @param selector Selector of the HTML element
   * @param action Action to perform when scroll reaches end
   */
  public static onScrollEnd(selector: any, action: any): void {
    if (Util.$) {
      const div: any = Util.$(selector)[0];
      Util.$(selector).on('scroll', (e: any) => {
        if (div.offsetHeight + div.scrollTop >= div.scrollHeight) {
          action();
        }
      });
    }
  }

  /**
   * Load a JavaScript file dynamically.
   * @param src URL of the JavaScript file to load
   */
  public static loadScript(src: any): void {
    if (Util.doc) {
      const doc: any = Util.doc;
      const script: any = doc.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;
      doc.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  /**
   * Load an image asynchronously.
   * @param src URL of the image to load
   * @param callback Callback function to handle loaded image
   */
  public static loadImage(src: any, callback: any): void {
    if (Util.isBrowser && typeof window !== 'undefined') {
      let image: any = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = function () {
        let canvas: any = Util.doc.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL();
        callback(dataURL);
      };
      image.src = src;
      if (image.complete || image.complete === undefined) {
        image.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        image.src = src;
      }
    }
  }

  /**
   * Convert an object to FormData for HTTP requests.
   * @param resource Object to convert to FormData
   * @returns FormData object
   */
  public static toFormData(resource: any): FormData {
    let data = new FormData();
    for (let key of Object.keys(resource)) {
      if (resource[key]) {
        data.append(key, resource[key]);
      }
    }
    return data;
  }

  /**
   * Check if the current browser is Safari.
   * @returns Boolean indicating if the current browser is Safari
   */
  public static isSafari(): boolean {
    if (Util.isBrowser && typeof window !== 'undefined') {
      return navigator.userAgent.toLowerCase().indexOf('safari') != -1;
    }
    return false;
  }
}
