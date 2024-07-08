import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Util } from 'src/app/app/utils/util';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent implements OnInit {
  @Input() filterData: any = {};
  categories: any = [];
  subcategories: any = [];
  @Input() action: any;
  doc: any ;
  isBrowser: boolean;
  constructor(
    private service: GlobalService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.doc = this.document;
    }
    this.loadCategories();
    this.loadSubCategories();
  }

  loadCategories() {
    this.service.store('categories').subscribe((res: any) => {
      this.categories = res;
    });
  }

  readLatLng() {
    var self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        self.filterData.lat = position.coords.latitude;
        self.filterData.lng = position.coords.longitude;
        self.filterData.search_key =
          '@' + position.coords.latitude + ',' + position.coords.longitude;
      });
    }
  }
  loadSubCategories() {
    this.service.store('subcategories').subscribe((res: any) => {
      this.subcategories = res;
    });
  }

  search() {
    if (this.isBrowser) {
      this.doc.$('.filter-modal').modal('hide');
    }
    Util.refreshComponent(this.route, '/search', null, this.filterData);
  }

  clear() {
    this.filterData.category_id = null;
    this.filterData.subcategory_id = null;
    this.filterData.lat = null;
    this.filterData.lng = null;
  }
}
