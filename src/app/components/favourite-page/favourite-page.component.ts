import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss']
})
export class FavouritePageComponent implements OnInit {

  subcategories: any[] = [];
  categories: any[] = [];
  contacts: any[] = [];
  ads: any[] = [];
  filterData: any = {};
  totalPages = 1;
  currentPage = 1;
  isLoading = false;

  // category map
  categoryMap: any = {}
  subcategoryMap: any = {}
  favouriteAction: any;
  isMobile: any = Util.isMobile();
  isBrowser: boolean;
  constructor(private matDailog: MatDialog, private service: GlobalService, private r: ActivatedRoute,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.loadContacts();
    var self = this;
    this.favouriteAction = (isFavorite: any) => {

      self.loadContacts();
    };
  }

  ngOnInit(): void {
    this.loadAds();
  }


  loadAds() {
    if (this.isBrowser){
      this.ads = DB.get('ads') ?? [];
    }
    this.service.store('ads', { page: 'favourite_page' }).subscribe((res: any) => {
      this.ads = res;
      if(this.isBrowser){
        DB.set('ads', res);
      }
    })
  }

  loadContacts(appends: any = false) {
    if (!appends) {
      this.currentPage = 1;
    }

    this.isLoading = true;
    this.filterData.is_loading = true;
    if (this.filterData.lat && this.filterData.lng)
      this.filterData.is_gps_search = true;
    var data = {
      lat: this.filterData.lat,
      lng: this.filterData.lng,
      search: this.filterData.search,
      result_type: this.filterData.result_type,
      category_id: this.filterData.category_id,
      subcategory_ids: this.filterData.subcategory_ids,
      page: this.currentPage
    };
    this.service.store('auth/favourites', data).subscribe((res: any) => {
      this.totalPages = res.total_pages;
      this.currentPage = res.current_page;
      if (!appends)
        this.contacts = res.data;
      else
        this.contacts = this.contacts.concat(res.data);

      this.isLoading = false;
      this.filterData.is_loading = false;
      this.filterData.is_gps_search = false;
    });
  }

  loadMore() {
    if (this.isLoading)
      return;
    this.currentPage += this.currentPage < this.totalPages ? 1 : 0;
    this.loadContacts(true);
  }

}
