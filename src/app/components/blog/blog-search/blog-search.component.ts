import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/app/utils/util';
import { DB } from 'src/app/app/models/db';
import { GlobalService } from 'src/app/shared/services/global.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.scss'],
})
export class BlogSearchComponent implements OnInit {
  doc: any ;
  list: any = [];
  searchResult: any = {};
  dataExists: boolean = false;
  show: any = false;
  searchValue: any = '';
  globalSearch: any;
  isSearch = false;
  timeout: any;
  @Input() filterData: any = {};
  isMobile: any = false;
  filterSearch: any;
  isBrowser: boolean;
  constructor(
    private service: GlobalService,
    private route: Router,
    private r: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = Util.isMobile();
    this.getQueryParams();
    this.filterSearch = () => {
    
      this.navigateToResultPage();
    };
  }

  async ngOnInit() {
    //this.search('');
    if (this.isBrowser) {
      this.doc = this.document
      this.doc.$('.filter-modal').modal('hide');
    }
    this.loadFromCache();
  }

  loadFromCache() {
    if (this.isBrowser && navigator && navigator.onLine !== undefined && !navigator.onLine) {
      this.searchResult = DB.get('searchResult') ?? [];
    }
  }

  getQueryParams() {
    this.r.queryParams.subscribe((params) => {
      if (params['lat'] && params['lat']) {
        this.filterData.lat = params['lat'];
        this.filterData.lng = params['lng'];
      }
      if (params['search']) {
        this.filterData.search = params['search'];
        this.searchValue = params['search'];
      }
    });
  }

  mapingResult() {
    this.searchResult.forEach((r: any) => (r.bg = Util.randBgColor()));
  }

  navigateToResultPage() {
    this.filterData.lat = null;
    this.filterData.lng = null;
    Util.refreshComponent(this.route, '/blog', null, this.filterData);
  }

  search(key: any) {
    this.loadFromCache();
    this.filterData.search = key;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      var data = {
        search: key,
      };
      this.service.store('blogs/', data).subscribe((res: any) => {
        this.searchResult = res;
        this.mapingResult();
        this.filterData.total_entries = res.total;
        if(this.isBrowser ){
          DB.set('searchResult', res);
        }
      });
    }, 100);
  }

  toggleSearch(show: any = true) {
    if (this.isBrowser) {
      if (show) this.doc.$('.search-input-container').css('height', '50px');
      else this.doc.$('.search-input-container').css('height', '50px');
      this.show = show;
    }
  }

  closeSearch() {
    if (this.isBrowser) {
      this.doc.$('.search-input-container').css('height', '50px');
    }
    this.show = false;
    this.filterData.search = '';
    this.searchValue = null;
    this.dataExists = false;
    this.searchResult = {};
    this.search('');
  }

  showSearchItem(item: any) {
    this.showContact(item);
  }

  showContact(item: any) {
    this.filterData.contact_id = item.id;
    this.filterData.search = item.title;
    Util.refreshComponent(this.route, '/search', null, this.filterData);
  }

  filterPage() {
    if (this.isBrowser) {
      this.doc.$('.filter-modal').modal('show');
    }
  }
}
