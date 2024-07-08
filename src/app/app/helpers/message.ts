import { Injectable, Inject, PLATFORM_ID, RendererFactory2, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { Util } from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class Message {
  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object, 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  private get document(): Document | null {
    return this.isBrowser ? document : null;
  }

  public confirm(title: any, action: any, cancelAction: any = null) {
    if (this.isBrowser) {
      Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: Util.trans('Yes'),
        cancelButtonText: Util.trans('Close'),
      }).then((result) => {
        if (result.isConfirmed) {
          action();
        } else if (result.isDenied && cancelAction) {
          cancelAction();
        }
      });
    }
  }

  public  error(title: any) {
    if (this.isBrowser) {
      try {
        // Example of handling errors directly with Renderer2
        const toast = this.renderer.createElement('div');
        this.renderer.addClass(toast, 'error-toast');
        const text = this.renderer.createText(title);
        this.renderer.appendChild(toast, text);
        this.renderer.appendChild(this.document?.body as Node, toast);
        setTimeout(() => {
          this.renderer.removeChild(this.document?.body as Node, toast);
        }, 3000);
      } catch (error) {
        console.error('Error displaying error toast:', error);
      }
    }
  }

  // Implement similar methods for success, warning, and prompt using Renderer2

  public success(title: any) {
    if (this.isBrowser) {
      try {
        // Implement success toast with Renderer2
      } catch (error) {
        console.error('Error displaying success toast:', error);
      }
    }
  }

  public warning(title: any) {
    if (this.isBrowser) {
      try {
        // Implement warning toast with Renderer2
      } catch (error) {
        console.error('Error displaying warning toast:', error);
      }
    }
  }

  public prompt(title: any, action: any) {
    if (this.isBrowser) {
      Swal.fire({
        title: title,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: Util.trans('ok'),
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return action(login);
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle confirmed prompt
        }
      });
    }
  }
}
