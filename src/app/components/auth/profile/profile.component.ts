import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/app/helpers/message';
import { Auth } from 'src/app/app/models/auth';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: any = {};
  verifyEmail: any;
  isLoading: any = false;
  util: any = Util;
  isBrowser: boolean
  constructor(private service: GlobalService, private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private message: Message
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.data = Auth.user();

    if (!Auth.getApiToken()) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  update() {
    if (this.isLoading)
      return;

    this.isLoading = true;
    this.service.store('auth/update-profile', Util.toFormData(this.data)).subscribe((res: any) => {
      if (res.status) {
        this.message.success("done");
        this.profile();
      } else {
        this.message.error(res.message);
      }

      this.isLoading = false;
    });
  }

  profile() {
    this.service.store('auth/me', this.data).subscribe((res: any) => {
      if (res.status) {
        if (this.isBrowser) {
          DB.set('user', res.data);
        }
      }
    });
  }
}
