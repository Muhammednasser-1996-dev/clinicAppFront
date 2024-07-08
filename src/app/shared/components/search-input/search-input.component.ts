import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/app/utils/util';
import { DB } from 'src/app/app/models/db';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  doc: any;
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

  }
  
  async ngOnInit() {
    this.filterSearch = () => {
      if (this.isBrowser) {
        this.doc = this.document
        this.doc.$('.filter-modal').modal('hide');
      }
      this.navigateToResultPage();
    };
    //this.search('');
    this.loadFromCache();
  }

  loadFromCache() {
    if (this.isBrowser) {
      this.searchResult = DB.get('searchResult') ?? [];
    } else {
      this.searchResult = [];
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
      if (params['search_key']) {
        this.filterData.search = params['search_key'];
        this.searchValue = params['search_key'];
      }
      if (params['category_id'] && params['category_id'] > 0) {
        this.filterData.category_id = params['category_id'];
      }
      if (params['subcategory_ids']) {
        this.filterData.subcategory_ids = params['subcategory_ids'];
      }
      if (params['subcategory_id'] && params['subcategory_id'] > 0) {
        if (!this.filterData.subcategory_ids)
          this.filterData.subcategory_ids = [];
        this.filterData.subcategory_ids.push(params['subcategory_id']);
      }
    });
  }

  mapingResult() {
    this.searchResult.forEach((r: any) => (r.bg = Util.randBgColor()));
  }

  readLatLng() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.filterData.lat = position.coords.latitude;
        this.filterData.lng = position.coords.longitude;
        //this.filterData.search_key = '@' + position.coords.latitude + ',' + position.coords.longitude;

        Util.refreshComponent(this.route, '/search', null, this.filterData);
      });
    }
  }

  navigateToResultPage() {
    this.filterData.lat = null;
    this.filterData.lng = null;
    Util.refreshComponent(this.route, '/search', null, this.filterData);
  }

  search(key: any) {
    this.loadFromCache();
    this.filterData.search = key;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      var data = {
        search: key,
      };
      this.service.store('clinics/search/', data).subscribe((res: any) => {
        this.searchResult = res;
        this.mapingResult();
        this.filterData.total_entries = res.total;
        this.removeDuplicateContacts();
        if (this.isBrowser ) {
          DB.set('searchResult', res);
        }
      });
    }, 100);
  }

  removeDuplicateContacts() {
    let contactMap: any = {};
    this.searchResult = this.searchResult.filter((element: any, index: any) => {
      if (!contactMap[element.title]) {
        contactMap[element.title] = true;
        return true;
      }
      return false;
    });
  }

  toggleSearch(show: any = true) {
    if (this.isBrowser) {
      if (show) this.doc.$('.search-input-container').css('height', '250px');
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
