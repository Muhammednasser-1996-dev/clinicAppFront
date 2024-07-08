import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/app/utils/util';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { DB } from 'src/app/app/models/db';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  subcategories: any[] = [];
  categories: any[] = [];
  contacts: any[] = [];
  ads: any[] = [];
  filterData: any = {};
  totalPages = 1;
  currentPage = 1;
  page = 1;
  isLoading = false;
  isMobile: any = Util.isMobile();
  resultTypes = [
    {
      label: 'All Result',
      value: 'all'
    },
    {
      label: 'With Phone',
      value: 'with_phone'
    },
    {
      label: 'Without Phone',
      value: 'without_phone'
    },
  ];

  // category map
  categoryMap: any = {};
  subcategoryMap: any = {};
  shownContacts: any = {};
  isBrowser: boolean
  constructor(
    private matDialog: MatDialog,
    private service: GlobalService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.filterData.result_type = this.resultTypes[0].value;
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.route.queryParams.subscribe(params => {
      this.initializeFilterData(params);
      this.loadSubCategories();
      this.loadContacts();
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadAds();
    this.mapping();
  }

  initializeFilterData(params: any): void {
    this.filterData.subcategory_ids = [];
    if (params['lat'] && params['lng']) {
      this.filterData.lat = params['lat'];
      this.filterData.lng = params['lng'];
    }
    if (params['search']) {
      this.filterData.search = params['search'];
    }
    if (params['category_id']) {
      this.filterData.category_id = params['category_id'];
    }
    if (params['subcategory_ids']) {
      this.filterData.subcategory_ids = Array.isArray(params['subcategory_ids']) ? params['subcategory_ids'] : [params['subcategory_ids']];
    }
    if (params['subcategory_id']) {
      this.filterData.subcategory_ids.push(params['subcategory_id']);
    }
    if (params['cityId']) {
      this.filterData.city_id = params['cityId'];
    }
  }

  loadCategories(): void {
    this.service.store('categories').subscribe((res: any) => {
      this.categories = res;
      this.mapping();
    });
  }

  loadAds(): void {
    if (this.isBrowser) {
      this.ads = DB.get('ads') ?? [];
    }
    this.service.store('ads', { page: 'search_result' }).subscribe((res: any) => {
      this.ads = res;
      if (this.isBrowser) {
        DB.set('ads', res);
      }
    });
  }

  loadSubCategories(): void {
    this.service.store('subcategories').subscribe((res: any) => {
      this.subcategories = res;
      this.mapping();
    });
  }

  loadContacts(appends: boolean = false): void {
    if (!appends) {
      this.currentPage = 1;
    }

    this.isLoading = true;
    this.filterData.is_loading = true;
    if (this.filterData.lat && this.filterData.lng) {
      this.filterData.is_gps_search = true;
    }

    const data = {
      lat: this.filterData.lat,
      lng: this.filterData.lng,
      search: this.filterData.search,
      result_type: this.filterData.result_type,
      category_id: this.filterData.category_id,
      subcategory_ids: this.filterData.subcategory_ids,
      city_id: this.filterData.city_id,
      page: this.page
    };

    if (isPlatformBrowser(this.platformId)) {
      if (!navigator.onLine) {
        if (this.isBrowser ) {
        this.contacts = DB.get('contacts') ?? [];
        this.filterData = DB.get('filterData') ?? {};
        }
        this.isLoading = false;
        this.filterData.is_loading = false;
        return;
      }
    }

    this.service.store('clinics', data).subscribe((res: any) => {
      this.totalPages = res.total_pages;
      this.currentPage = res.current_page;
      this.filterData.total_entries = res.total;
      this.filterData.with_phone = res.with_phone;
      this.filterData.without_phone = res.without_phone;
      if (!appends) {
        this.contacts = res.data;
      } else {
        this.contacts = this.contacts.concat(res.data);
      }
      this.isLoading = false;
      this.filterData.is_loading = false;
      this.filterData.is_gps_search = false;
      this.removeDuplicateContacts();
      // cache result
      if (isPlatformBrowser(this.platformId)) {
        DB.set('contacts', this.contacts);
        DB.set('filterData', this.filterData);
      }
    });
  }

  removeDuplicateContacts(): void {
    const contactMap: any = {};
    this.contacts = this.contacts.filter((element: any) => {
      if (!contactMap[element.title]) {
        contactMap[element.title] = true;
        return true;
      }
      return false;
    });
  }

  loadMore(): void {
    if (this.isLoading) {
      return;
    }
    this.page += this.currentPage < this.totalPages ? 1 : 0;
    this.loadContacts(true);
  }

  initData() {
    this.categories = [
      {
        id: 1,
        name: 'Medical'
      },
      {
        id: 1,
        name: 'Hospital'
      }
    ];
    this.subcategories = [
      {
        id: 1,
        name: 'Dentist'
      },
      {
        id: 2,
        name: 'neurologist'
      },
      {
        id: 3,
        name: 'Dentist'
      }
    ];


    this.ads = [
      {
        id: 1,
        title: 'Paris',
        description: 'Constant care and attention to the patients makes good record',
        link: 'https://angular.io/start/start-routing',
        image: 'http://easybook.kwst.net/images/city/3.jpg',
      },
      {
        id: 2,
        title: 'Rome',
        description: 'Constant care and attention to the patients makes good record',
        link: 'https://angular.io/start/start-routing',
        image: 'http://easybook.kwst.net/images/city/7.jpg',
      },

    ];
  }

  mapping(): void {
    this.categories.forEach((c) => this.categoryMap[c.id] = c);
    this.subcategories.forEach((s) => this.subcategoryMap[s.id] = s);
  }

  chooseCategory(): void {
    this.filterData.subcategory_ids = [];
    this.loadContacts();
  }

  chooseSubCategory(id: any, isSelected: any): void {
    if (isSelected) {
      this.filterData.subcategory_ids.push(id);
    } else {
      const index = this.filterData.subcategory_ids.indexOf(id);
      if (index !== -1) {
        this.filterData.subcategory_ids.splice(index, 1);
      }
    }
    this.loadContacts();
  }
}
