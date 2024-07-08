import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Util } from '../utils/util';
import { DB } from './db';

export class AdsManager {

  private static instance: AdsManager;
  ads: any = [];
  adsShow: boolean = false;
  nextAdsTime: any = 10;
  isMobile: any = false;
  isBrowser: boolean;

  private constructor(platformId: Object) {
    this.isMobile = Util.isMobile();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public static getInstance(platformId: Object) {
    if (!AdsManager.instance) {
      AdsManager.instance = new AdsManager(platformId);
    }
    return AdsManager.instance;
  }

  public getAds() {
    let ads: any = [];
    if (this.isBrowser) {
      ads = DB.get('mobile_ads') ?? [];
    }
    return ads;
  }

  resetAdsShow() {
    setTimeout(() => {
      this.adsShow = false;
    }, this.nextAdsTime);
  }

  getRandAds() {
    if (this.isBrowser) {
      const ads = this.getAds();
      const oldIndex = DB.get('old_ads_index') ?? -1;
      const index = (oldIndex + 1) < ads.length ? oldIndex + 1 : 0;
      DB.set('old_ads_index', index);
      return ads[index];
    }
    return null;
  }

  public getAdd(skipIsMobile: any = false) {
    if (!skipIsMobile && (this.adsShow || !this.isMobile)) {
      return {};
    }
    const item = this.getRandAds();

    if (this.isBrowser) {
      const page = window.location.pathname.replace('/', '');
      if (page === 'search') {
        // Handle specific logic for 'search' page
      } else {
        // Handle other pages
      }
    }

    this.adsShow = true;
    this.resetAdsShow();
    return item;
  }
}
