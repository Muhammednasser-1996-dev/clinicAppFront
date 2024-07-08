import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isMobile = false;
  categories: any = [];

  constructor(private service: GlobalService) {
    this.isMobile = Util.isMobile();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.service.store('categories').subscribe((res: any) => {
      this.categories = res;
    })
  }

}
