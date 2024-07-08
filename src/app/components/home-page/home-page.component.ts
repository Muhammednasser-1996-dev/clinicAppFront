import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  categories: any = [];
  subcategories: any = [];
  cities: any = [];
  filterData: any = {
    category_id: 0,
    subcategory_id: 0,
    cityId: 0,
  };

  isMobile: any = false;
  constructor(private service: GlobalService) {
    this.isMobile = Util.isMobile();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.loadCities();
  }

  loadCategories() {
    this.service.store('categories').subscribe((res: any) => {
      this.categories = res;
    });
  }

  loadSubCategories() {
    this.service.store('subcategories').subscribe((res: any) => {
      this.subcategories = res;
    });
  }

  loadCities() {
    this.service.getCities().subscribe((res: any) => {
      this.cities = res;
    });
  }
}
