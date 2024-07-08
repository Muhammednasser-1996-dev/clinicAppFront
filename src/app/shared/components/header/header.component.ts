import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/app/models/auth';
import { Util } from 'src/app/app/utils/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = {};
  isLogin: any = false;
  isMobile = Util.isMobile();
  locale: any;
  url: any;
  isBrowser: boolean;
  constructor(private route: Router, private r: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.user = Auth.user() ?? {};
    this.locale = Auth.locale();
    this.isLogin = Auth.getApiToken();
    r.queryParams.subscribe((res: any) => {
      this.getUrl();
    })
    this.getUrl();
  }

  ngOnInit(): void {
  }

  getUrl() {
    if (this.isBrowser){
      this.url = window.location.pathname.replace('/', '');
    }
  }

  login() {
    Util.refreshComponent(this.route, '/login');
  }

  favourite() {
    Util.refreshComponent(this.route, '/favourite');
  }

  profile() {
    Util.refreshComponent(this.route, '/profile');
  }

  logout() {
    if (confirm(Util.trans('Are you sure'))) {
      Auth.logout(PLATFORM_ID);
      Util.refreshComponent(this.route, '/');
    }
  }

  changeLanguage() {
    var lang = 'ar';
    if (Auth.locale() == 'ar') {
      lang = 'en';
    } else {
      lang = 'ar';
    }
    Auth.setLocale(lang);
    this.locale = lang;
    if (this.isBrowser){
      window.location.reload();
    }
  }
}
