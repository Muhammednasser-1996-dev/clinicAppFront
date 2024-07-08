import { Images } from "src/app/config/images";
import { GlobalService } from "src/app/shared/services/global.service";
import { Product } from "../models/product";
import { SyncUtil } from '../util/syncUtil';
import { Tax } from '../models/tax';
import { Assets } from "src/app/config/assets";
import { Branch } from "./../models/";
import { Apis } from "src/app/config/apis";
import { isPlatformBrowser } from "@angular/common";
import { Inject, PLATFORM_ID } from "@angular/core";

export class App {

  // instance of application
  private static instance: App = new App(PLATFORM_ID);

  protected canLoadImage: boolean = false;
  protected service: any;
  protected currentLoad: any = "";
  protected onloadEvent: any;
  protected onfinishEvent: any;
  private lazytime: number = 1;
  private applicationMeta: any = {};
  isBrowser: boolean = false;
  //

  // selected location
  public selectedLocationId: any;

  //
  public onSelectLocation: any;


  public settings: any = {
    taxes: {}
  };

  private constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public static getApp() {
    this.instance.setDefaultBranch();
    return this.instance;
  }

  public selectLocation(id: any) {
    this.selectedLocationId = id;
    if (this.onSelectLocation) {
      this.onSelectLocation();
    }
  }

  public async setDefaultBranch() {
    this.selectedLocationId = (await Branch.defaultLocation())?.id;
  }

  public setService(service: any) {
    this.service = service;
  }

  public onload(action: any) {
    this.onloadEvent = action;
  }

  public onfinish(action: any) {
    this.onfinishEvent = action;
  }

  public isOnline() {
    return true;
  }

  public loadMeta() {
    this.service.store(Apis.APPLICATION_META).subscribe((res: any) => {
      this.applicationMeta = res;
    });
  }

  public load() {
    var imagesQueue = this.getAssets();
    this.loadImages(imagesQueue, () => {
      this.loadData(async () => {
        var productImgs = await this.getProductImages();
        this.loadImages(productImgs, () => {
          this.loadUserSettings(() => {
            if (this.onfinishEvent)
              this.onfinishEvent();
          }, "Load User Settings");
        }, "Items Images");
      });
    }, "Assets");
  }

  private async loadImages(array: any, action: any, text: any = "Assets") {
    //alert();
    if (action && !this.canLoadImage)
      return action();

    var self = this;
    var nextItem: any = array.pop();
    if (self.onloadEvent) {
      self.onloadEvent(text);
    }
    if (this.isBrowser) {
      let img = document.createElement('img');

      if (nextItem) {
        img.src = nextItem;
        img.onload = async function () {
          self.loadImages(array, action, text);
        };
        img.onerror = async function () {
          self.loadImages(array, action, text);
        };
      } else {
        if (action)
          action();
      }
    }
  }

  private loadData(action: any) {
    var self: any = this;
    if (this.onloadEvent) {
      this.onloadEvent("Load User Data");
    }
    SyncUtil.download(this.service, this.onloadEvent, action);
  }

  private async getProductImages() {
    var images: any = [];
    var products = await Product.query().toArray();
    products.forEach((product: any) => {
      images.push(product.image_url);
    });
    return images;
  }


  private getAssets() {
    var images: any = Assets;
    var assetImgs: any = [];
    Object.keys(images).forEach((key: any) => {
      assetImgs.push(images[key]);
    });

    return assetImgs;
  }

  private loadUserSettings(action: any, title: any) {
    if (this.onloadEvent) {
      this.onloadEvent(title);
    }
    // change settings
    // SettingUtil.changeSettings(Auth.getSettings());

    action ? action() : null;
  }

  public async loadSettings() {
    this.settings.taxes = await Tax.notDeleted();
  }
}
