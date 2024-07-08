import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/app/models/auth';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  lang: any;
  constructor() {
    this.lang = Auth.locale();
  }

  ngOnInit(): void {
  }

}
