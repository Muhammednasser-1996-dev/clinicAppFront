import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-ads-card-item',
  templateUrl: './ads-card-item.component.html',
  styleUrls: ['./ads-card-item.component.scss']
})
export class AdsCardItemComponent implements OnInit {

  @Input() item: any = {};
  url: any;
  isMobile: any = false;
  isBrowser:boolean
  constructor(private sanitizer: DomSanitizer, private service: GlobalService,  @Inject(PLATFORM_ID) private platformId: Object) {
    this.isMobile = Util.isMobile();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
  }

  ngOnChanges(changes: any): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
    //this.url = this.sanitizer.bypassSecurityTrustUrl(this.item.link);
  }


  gotoLink() {
    this.addView();
    if(this.isBrowser){
      window.open(this.item.link, '_blank');
    }
  }


  addView() {
    this.service.store('ads-view/' + this.item.id).subscribe((res: any) => {
      //
    });
  }
}
