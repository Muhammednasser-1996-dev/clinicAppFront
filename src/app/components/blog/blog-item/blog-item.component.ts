import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AdsManager } from 'src/app/app/models/adsManager';
import { Auth } from 'src/app/app/models/auth';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {

  @Input() blog: any = {};
  lang: any;
  isBrowser: boolean;

  constructor(private route: Router, private service: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.lang = Auth.locale();
  }

  ngOnInit(): void {
  }

  // gotoBlog() {
  //   var slug = this.blog.title_ar.replace(/ /g, '-');
  //   if (!this.blog.type) {
  //   }
  //   else {

  //     this.gotoLink();
  //   }
  // }
 

  gotoLink() {
    this.addView();
    if (this.isBrowser) {
      window.open(this.blog.link, '_blank');
    }
  }

  addView() {
    this.service.store('ads-view/' + this.blog.id).subscribe((res: any) => {
      //
    });
  }

}
