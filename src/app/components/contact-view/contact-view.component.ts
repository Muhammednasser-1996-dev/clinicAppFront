import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
})
export class ContactViewComponent implements OnInit {
  subcategories: any[] = [];
  categories: any[] = [];
  contacts: any[] = [];
  ads: any[] = [];
  filterData: any = {};
  totalPages = 1;
  currentPage = 1;
  isLoading = false;
  id: any;
  similarContacts: any = [];
  contact: any = {};

  // category map
  categoryMap: any = {};
  subcategoryMap: any = {};
  favouriteAction: any;
  isMobile: any = Util.isMobile();
  isBrowser: boolean;
  constructor(
    private matDailog: MatDialog,
    private service: GlobalService,
    private r: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);


    this.id = this.r.snapshot.paramMap.get('id');

    this.r.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) this.loadContacts();
    });

    if (this.id) this.loadContacts();
  }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds() {
    if (this.isBrowser){
      this.ads = DB.get('ads') ?? [];
    }
    this.service.store('ads', { page: 'show_clinic' }).subscribe((res: any) => {
      this.ads = res;
      if (this.isBrowser){
        DB.set('ads', res);
      }
    });
  }

  loadSimilarContacts() {
    var data = {
      subcategory_ids: [this.contact.subcategory_id],
    };
    this.service.store('clinics', data).subscribe((res: any) => {
      this.similarContacts = res.data;
    });
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
      slug: this.id,
    };
    this.service.store('clinics', data).subscribe((res: any) => {
      this.totalPages = res.total_pages;
      this.currentPage = res.current_page;
      this.contacts = [res.data[0]] ?? [];
      this.contact = res.data[0] ?? {};
      this.updateMetaTags(this.contact)
      this.loadSimilarContacts();
      this.isLoading = false;
      this.filterData.is_loading = false;
      this.filterData.is_gps_search = false;
    });
  }

  updateMetaTags(data: any) {
    console.log(">>", data);

    // Update title
    this.title.setTitle(data.title);

    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }

    if (data.title) {
      this.meta.updateTag({ property: 'og:title', content: data.title });
    }

    if (data.address) {
      this.meta.updateTag({ property: 'og:address', content: data.address });
    }
    if (data.mobile) {
      this.meta.updateTag({ property: 'og:mobile', content: data.mobile });
    }
    if (data.latitude) {
      this.meta.updateTag({
        property: 'og:latitude',
        content: data.latitude,
      });
    }
    if (data.longitude) {
      this.meta.updateTag({ property: 'og:longitude', content: data.longitude });
    }
    if (data.subcategory) {
      this.meta.updateTag({ property: 'og:category', content: data.subcategory });
    }
    if (data.city_name) {
      this.meta.updateTag({ property: 'og:city', content: data.city_name });
    }
  }
}
