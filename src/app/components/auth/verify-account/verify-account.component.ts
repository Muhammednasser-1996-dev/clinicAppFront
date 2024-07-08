import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {
  data: any = {};
  doc: any;
  verifyEmail: any;
  isLoading: any = false;
  verifyCode: any;
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

  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.doc = this.document;
      this.verifyEmail = DB.get('verify_email') ?? '';
    }
    this.verifyEmail = this.verifyEmail?.substring(0, 5) + 'xxxxxx@gmail.com';
    this.r.queryParams.subscribe((params) => {
      if (params['code']) {
        this.verifyCode = params['code'];
        this.data.n1 = this.verifyCode[0] ?? '';
        this.data.n2 = this.verifyCode[1] ?? '';
        this.data.n3 = this.verifyCode[2] ?? '';
        this.data.n4 = this.verifyCode[3] ?? '';
        this.verify();
      }
    });
    setTimeout(() => {
      this.initSmsInput();
    }, 300);
  }

  verify() {
    if (this.isLoading) return;
    var data = {
      verify_code: this.verifyCode
        ? this.verifyCode
        : this.data.n1 + this.data.n2 + this.data.n3 + this.data.n4,
    };

    if (!data) {
      return this.message.error(Util.trans('verify code required'));
    }
    this.isLoading = true;
    this.service.store('auth/verify', data).subscribe((res: any) => {
      if (res.data.verify_code) {
        this.message.error(Util.trans('verify code required'));
      }
      if (res.status) {
        this.message.success(Util.trans('done'));
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
      if (this.isBrowser) {
        DB.set('user', res);
      }
      //
      Util.refreshComponent(this.route, '/');
      if (this.isBrowser) {
        window.location.href = '/profile';
      }
    });
  }

  register() {
    Util.refreshComponent(this.route, '/register');
  }

  initSmsInput() {
    if (this.isBrowser) {
      var body = this.doc.$('body');
      var self = this;

      function goToNextInput(e: any) {
        var key = e.which,
          t = self.doc.$(e.target),
          sib = t.next('input');

        if (key != 9 && (key < 48 || key > 57)) {
          e.preventDefault();
          return false;
        }

        if (key === 9) {
          return true;
        }

        if (!sib || !sib.length) {
          sib = body.find('input').eq(0);
        }
        sib.select().focus();
        return false;
      }

      function onKeyDown(e: any) {
        var key = e.which;

        if (key === 9 || (key >= 48 && key <= 57)) {
          return true;
        }

        e.preventDefault();
        return false;
      }

      function onFocus(e: any) {
        self.doc.$(e.target).select();
      }

      body.on('keyup', 'input', goToNextInput);
      body.on('keydown', 'input', onKeyDown);
      body.on('click', 'input', onFocus);
    }
  }
}
