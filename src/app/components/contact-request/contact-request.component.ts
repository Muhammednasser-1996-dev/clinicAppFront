import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/app/helpers/message';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-contact-request',
  templateUrl: './contact-request.component.html',
  styleUrls: ['./contact-request.component.scss']
})
export class ContactRequestComponent implements OnInit {

  subcategories: any[] = [];
  request: any = {
    subcategory_id: null
  };

  contact: any = {};
  isLoading: any = false;

  constructor(
    public dialogRef: MatDialogRef<ContactRequestComponent>,
    private service: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: Message
    
  ) {
    this.contact = data.resource;
  }

  ngOnInit(): void {
    this.loadSubCategories();
  }

  loadSubCategories() {
    this.service.store('subcategories').subscribe((res: any) => {
      this.subcategories = res;
    })
  }
  sendRequest() {
    if (!this.request.name) {
      this.message.error(Util.trans('enter at least name'));
      return;
    }
    this.isLoading = true;
    this.request.id = this.contact.id;
    this.service.store('clinics/send-request', this.request).subscribe((res: any) => {
      if (res.status) {
        this.message.success(res.message);
        this.request = {};
        this.dialogRef.close();
      } else {
        this.message.error(res.message);
      }
      this.isLoading = false;
    });
  }

}
