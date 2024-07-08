import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data: any = {};
  doc: any;
  isLoading: any = false;
  oauthId: any;
  oauthType: any;
  backendUrl: any = environment.backendUrl;
  isBrowser: boolean;
  constructor(
    private service: GlobalService,
    private route: Router,
    private r: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document, 
    private message: Message
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    r.queryParams.subscribe((params) => {
      this.oauthId = params['oauth_id'];
      this.oauthType = params['oauth_type'];

      this.signInWithGoogle();
    });
  }

  ngOnInit(): void { 
    if (this.isBrowser) {
      this.doc = this.document;
    }
  }

  signInWithGoogle(): void {
    if (this.oauthId && this.oauthType) {
      if (this.isBrowser) {
        this.doc.$('.app-loader').show();
      }
      let data = {
        oauth_id: this.oauthId,
        oauth_type: this.oauthType,
      };
      this.service.store('auth/external-login', data).subscribe((res: any) => {
        if (res.status) {
          this.message.success(Util.trans('done'));
          if (this.isBrowser) {
            DB.set('api_token', res.data.access_token);
          }
          this.profile();
        } else {
          this.message.error(Util.trans(res.message));
        }
        if (this.isBrowser) {
          this.doc.$('.app-loader').hide();
        }
      });
    }
  }

  signInWithFB(): void { }

  login() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.service.store('auth/login', this.data).subscribe((res: any) => {
      if (res.status) {
        this.message.success(Util.trans('done'));
        if (this.isBrowser) {
          DB.set('api_token', res.data.access_token);
        }
        this.profile();
      } else {
        this.message.error(Util.trans(res.message));
        this.isLoading = false;
      }
      if (res.data?.verfiy) {
        if (this.isBrowser) {

          DB.set('verify_email', this.data.email);
        }
        Util.refreshComponent(this.route, '/verify');
      }
    });
  }

  profile() {
    this.service.store('auth/me', this.data).subscribe((res: any) => {
      if (this.isBrowser) {
        DB.set('user', res);
      }
      Util.refreshComponent(this.route, '/home');
      this.isLoading = false;
    });
  }

  register() {
    Util.refreshComponent(this.route, '/register');
  }

  forgetPassword() {
    Util.refreshComponent(this.route, '/forget-password');
  }
}
