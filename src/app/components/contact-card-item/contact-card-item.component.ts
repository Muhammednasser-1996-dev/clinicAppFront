import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Util } from 'src/app/app/utils/util';
import { ShareContactComponent } from '../share-contact/share-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactRequestComponent } from '../contact-request/contact-request.component';
import { ContactCommentComponent } from '../contact-comment/contact-comment.component';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Auth } from 'src/app/app/models/auth';
import { Router } from '@angular/router';
import { AdsManager } from 'src/app/app/models/adsManager';
import { ContactHoursComponent } from '../contact-hours/contact-hours.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-card-item',
  templateUrl: './contact-card-item.component.html',
  styleUrls: ['./contact-card-item.component.scss'],
})
export class ContactCardItemComponent implements OnInit {
  @Input() contact: any = {};
  @Input() favouriteAction: any;
  doc: any ;
  isMobile: any = false;
  ads: any = {};
  isBrowser: boolean;
  constructor(
    private matDailog: MatDialog,
    private service: GlobalService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  
    this.isMobile = Util.isMobile();
    this.ads = AdsManager.getInstance(PLATFORM_ID).getAdd();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.doc = this.document;
    }
  }

  share() {
    Util.showDialog(this.matDailog, ShareContactComponent, {
      data: {
        resource: this.contact,
      },
    });
  }

  edit() {
    if (!Auth.getApiToken()) {
      return Util.refreshComponent(this.route, 'login');
    }
    Util.showDialog(this.matDailog, ContactRequestComponent, {
      data: {
        resource: this.contact,
      },
    });
  }

  comment() {
    if (!Auth.getApiToken()) {
      return Util.refreshComponent(this.route, 'login');
    }
    Util.showDialog(this.matDailog, ContactCommentComponent, {
      data: {
        resource: this.contact,
      },
    });
  }

  openingHours() {
    Util.showDialog(this.matDailog, ContactHoursComponent, {
      data: {
        resource: this.contact,
      },
    });
  }

  addToFavourite() {
    if (!Auth.getApiToken()) {
      return Util.refreshComponent(this.route, 'login');
    }
    var data = {
      is_favorite: this.contact.is_favorite ? false : 1,
    };
    this.service
      .store('clinics/' + this.contact.id + '/favourite', data)
      .subscribe((res: any) => {
        if (res.status) {
          this.contact.is_favorite = this.contact.is_favorite ? false : 1;
          this.favouriteAction
            ? this.favouriteAction(this.contact.is_favorite)
            : null;
        } else {
        }
      });
  }

  getPhone() {
    if (this.contact.is_phone_loaded) {
      return;
    }
    this.service
      .store('clinics/' + this.contact.id + '/phone')
      .subscribe((res: any) => {
        this.contact.mobile = res.data;
        //
        if (this.isBrowser) {
          this.doc
            .$('#phone' + this.contact.id)
            .attr('href', `tel:${this.contact.mobile}`);
          this.doc
            .$('#whatsapp' + this.contact.id)
            .attr(
              'href',
              `https://wa.me/${this.contact?.mobile?.replaceAll(' ', '')}`
            );
          this.doc.$('#whatsapp' + this.contact.id).attr('target', '_blank');
        }
        this.contact.is_phone_loaded = true;
      });
  }
}
