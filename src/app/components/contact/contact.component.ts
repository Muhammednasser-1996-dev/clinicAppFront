import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/app/helpers/message';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  data: any = {};
  isLoading: boolean = false;

  constructor(private service: GlobalService, private message: Message) { }

  ngOnInit(): void {
  }


  send() {
    if (this.isLoading)
      return;

    if (!Util.validateObject(this.data, [
      'name',
      'email',
      'message'
    ])) {
      this.message.error(Util.trans('all_fields_are_required'));
      return;
    }

    this.isLoading = true;
    this.service.store('send-message', this.data).subscribe((res: any) => {
      if (res.status) {
        this.message.success(Util.trans('done'));
        this.data = {};
      } else {
        this.message.error(res.message);
      }
      this.isLoading = false;
      this.data = {};
    }, (error) => {
      this.isLoading = false;
    });
  }



}
