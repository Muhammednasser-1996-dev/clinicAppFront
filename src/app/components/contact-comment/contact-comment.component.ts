import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/app/helpers/message';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-contact-comment',
  templateUrl: './contact-comment.component.html',
  styleUrls: ['./contact-comment.component.scss']
})
export class ContactCommentComponent implements OnInit {

  subcategories: any[] = [];
  resource: any = {};
  isLoading: any = false;

  contact: any = {};

  constructor(
    public dialogRef: MatDialogRef<ContactCommentComponent>,
    private service: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: Message
  ) {
    this.contact = data.resource;
  }

  ngOnInit(): void {
  }

  sendComment() {
    if (!this.resource.comment) {
      this.message.error(Util.trans('enter your comment'));
      return;
    }
    this.isLoading = true;
    this.resource.id = this.contact.id;
    this.service.store('clinics/send-comment', this.resource).subscribe((res: any) => {
      if (res.status) {
        this.message.success(res.message);
        this.resource = {};
        this.dialogRef.close();
      } else {
        this.message.error(res.message);
      }
      this.isLoading = false;
    });
  }
}
