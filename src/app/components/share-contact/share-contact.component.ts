import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Util } from 'src/app/app/utils/util';

@Component({
  selector: 'app-share-contact',
  templateUrl: './share-contact.component.html',
  styleUrls: ['./share-contact.component.scss'],
})
export class ShareContactComponent implements OnInit {
  contact: any = {};
  doc: any;
  win: any;
  isBrowser: boolean;
  constructor(
    public dialogRef: MatDialogRef<ShareContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,

  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.contact = data.resource;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      this.win = window;
      this.doc = this.document;
    }
    setTimeout(() => {
      if (this.isBrowser) {
        this.doc.$('.share-btn').attr('data-url', this.contact.contact_url);
        this.win.Sharer.init();
      }
    }, 400);
  }

  copy() {
    // copy contact link
    Util.copyText(this.contact.contact_url);
  }
}
