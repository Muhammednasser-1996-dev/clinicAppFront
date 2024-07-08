import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/app/helpers/message';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-contact-hours',
  templateUrl: './contact-hours.component.html',
  styleUrls: ['./contact-hours.component.scss']
})
export class ContactHoursComponent implements OnInit {

  subcategories: any[] = [];
  resource: any = {};
  isLoading: any = false;

  contact: any = {};
  hours: any = [];

  constructor(
    public dialogRef: MatDialogRef<ContactHoursComponent>,
    private service: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.contact = data.resource;
    this.getHours();
  }

  ngOnInit(): void {
  }

  getHours() {
    this.hours = this.contact.opening_hours ?? [];
  }
}
