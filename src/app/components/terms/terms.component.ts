import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/app/models/auth';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  lang: any;
  constructor() {
    this.lang = Auth.locale();
  }

  ngOnInit(): void {
  }

}
