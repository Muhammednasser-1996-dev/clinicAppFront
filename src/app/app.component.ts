import { Component, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GlobalService } from './shared/services/global.service';
import { DB } from './app/models/db';
import { Util } from './app/utils/util';
import { Auth } from './app/models/auth';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  doc: any;
  title = 'clinicAppFront';
  isBrowser: boolean;


  constructor(
    private service: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta, private titles: Title
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    Auth.setLocale(Auth.locale());
    if (Util.isMobile()) {
      this.loadAds();
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.doc = this.document;
    }
  }

  loadAds() {
    if (this.isBrowser) {
      this.doc.mobile_ads = DB.get('mobile_ads') ?? [];
      this.service.store('ads', { page: 'mobile' }).subscribe((res: any) => {
        this.doc.mobile_ads = res;
        DB.set('mobile_ads', res);
      });
    }
  }
}
