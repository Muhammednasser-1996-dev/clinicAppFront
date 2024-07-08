import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  data: any = {};
  isLoading: any = false;
  isBrowser: boolean
  constructor(private service: GlobalService, private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private message: Message
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
  }

  resetPassword() {
    if (this.isLoading)
      return;

    if (!this.data.password || !this.data.verification_key) {
      return this.message.error(Util.trans('enter_password_and_verification_key'));
    }
    this.isLoading = true;
    this.service.store('auth/reset-password', this.data).subscribe((res: any) => {
      if (res.status) {
        this.message.success(Util.trans("done"));
        if (this.isBrowser) {
          DB.set('api_token', res.data.access_token);
        }
        this.profile();
      } else {
        this.message.error(res.message);
      }

      this.isLoading = false;
    });
  }

  profile() {
    this.service.store('auth/me', this.data).subscribe((res: any) => {
      if(this.isBrowser){
        DB.set('user', res);
      }
      Util.refreshComponent(this.route, '/');
    });
  }

  register() {
    Util.refreshComponent(this.route, '/register');
  }

}
