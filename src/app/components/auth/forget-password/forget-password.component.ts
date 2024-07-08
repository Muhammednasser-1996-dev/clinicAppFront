import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  data: any = {};
  isLoading: any = false;

    
  constructor(private service: GlobalService, private route: Router,private message: Message ) {
  }

  ngOnInit(): void {
  }

  forgetPassword() {
    if (this.isLoading)
      return;
    var data = {
      phone: this.data.email
    };

    if (!this.data.email) {
      return this.message.error(Util.trans('Email Required'));
    }
    this.isLoading = true;
    this.service.store('auth/forget-password', data).subscribe((res: any) => {
      if (res.status) {
        this.message.success(Util.trans("done"));
        if (res.data.reset) {
          Util.refreshComponent(this.route, '/reset-password');
        }
      } else {
        this.message.error(res.message);
      }

      this.isLoading = false;
    });
  }


  register() {
    Util.refreshComponent(this.route, '/register');
  }

}
