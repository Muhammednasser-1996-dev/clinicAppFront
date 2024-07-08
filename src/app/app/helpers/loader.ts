import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public toggleLoading(showLoading = true): void {
    if (this.isBrowser) {
      const elements = this.document.getElementsByClassName('app-loading');
      if (elements.length > 0) {
        const element = elements[0];
        this.renderer.setStyle(element, 'display', showLoading ? 'block' : 'none');
      }
    }
  }
}