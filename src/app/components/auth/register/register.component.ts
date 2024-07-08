import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: any = {};
  emailTxt: any = false;
  isLoading: any = false
  isBrowser: boolean;
  constructor(private service: GlobalService, private route: Router,
    private message: Message,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true;
    this.service.store('auth/register', this.data).subscribe((res: any) => {
      if (res.errors?.email) {
        this.emailTxt = Util.trans('email already exists');
      } else
        this.emailTxt = false;
      if (res.status) {
        this.message.success(Util.trans("done"));
        if (this.isBrowser) {
          DB.set('api_token', res.data.access_token);
        }
      } else {
        this.message.error(Util.trans(res.message));
      }
      this.isLoading = false;

      if (res.data.verfiy) {
        if (this.isBrowser) {
          DB.set('verify_email', this.data.email);
        }
        Util.refreshComponent(this.route, '/verify');
      }
    });
  }


  login() {
    Util.refreshComponent(this.route, '/login');
  }

  forgetPassword() {
    Util.refreshComponent(this.route, '/forget-password');
  }

}
