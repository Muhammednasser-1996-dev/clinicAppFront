import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AdsManager } from 'src/app/app/models/adsManager';
import { Auth } from 'src/app/app/models/auth';
import { DB } from 'src/app/app/models/db';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MetadataServiceService } from 'src/app/shared/services/metadata-service.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  blog: any = {};
  myad: any = {};
  id: any;
  ads: any = [];
  blogs: any = [];
  lang: any;
  isBrowser: boolean;
  similarContacts: any = [];

  constructor(
    private r: ActivatedRoute,
    private service: GlobalService,
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    @Optional() private metadataService: MetadataServiceService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.lang = Auth.locale();
    this.r.paramMap.subscribe(params => {
      this.id = params.get('title_ar');
    });

  }

  ngOnInit(): void {
    this.loadBlog();

    // if (this.isBrowser) {
    //   setTimeout(() => {
    //     this.initShareButtons();
    //   }, 400);
    // }
  }


  loadBlogs() {
    this.service
      .store('blogs', { blog_category_id: this.blog.blog_category_id })
      .subscribe((res: any) => {
        this.blogs = res.data;
      });
  }

  loadMyAd() {
    this.myad = AdsManager.getInstance(PLATFORM_ID).getAdd(true);
    if (this.myad) this.myad.type = 'blog';
  }

  loadBlog() {
    this.service.store('blogs/' + this.id).subscribe((res) => {
      this.blog = res;
      this.setMetaTags(this.blog);
      this.loadSimilarContacts();
      this.loadBlogs();
    });
  }

  setMetaTags(blog: any) {
    const metaDescription = blog?.meta_description || 'Default description';
    const metaTitle = blog?.title || 'Default title';

    this.title.setTitle(metaTitle);
    if (this.metadataService) {
      this.metadataService.updateMetadata({
        title: metaTitle,
        description: metaDescription,
      });
    } else {
      this.meta.updateTag({ name: 'description', content: metaDescription });
      this.meta.updateTag({ property: 'og:description', content: metaDescription });
      this.meta.updateTag({ property: 'og:title', content: metaTitle });
      this.meta.updateTag({ property: 'og:url', content: this.document.location.href });
    }
  }

  // setMetaTags(blog: any) {
  //   this.title.setTitle(blog?.title);
  //   if (this.metadataService) {
  //     this.metadataService.updateMetadata({
  //       title: blog?.title,
  //       description: blog?.meta_description
  //     });
  //   }
  //   this.meta.updateTag({
  //     property: 'og:meta_description',
  //     content: blog?.meta_description,
  //   });
  //   this.meta.updateTag({
  //     property: 'og:meta_description_ar',
  //     content: blog?.meta_description_ar,
  //   });
  //   this.meta.updateTag({
  //     property: 'og:meta_keywords',
  //     content: blog?.meta_keywords,
  //   });
  //   this.meta.updateTag({
  //     property: 'og:meta_keywords_ar',
  //     content: blog?.meta_keywords_ar,
  //   });
  //   this.meta.updateTag({ property: 'og:url', content: blog?.url });
  //   this.meta.updateTag({
  //     property: 'og:meta_title',
  //     content: blog?.meta_title,
  //   });
  //   this.meta.updateTag({
  //     property: 'og:meta_title_ar',
  //     content: blog?.meta_title_ar,
  //   });
  // }

  // initShareButtons() {
  //   const shareButtons = this.document.querySelectorAll('.share-btn');
  //   shareButtons.forEach((btn: HTMLElement) => {
  //     btn.setAttribute('data-url', window.location.href);
  //   });
  //   if (window['Sharer']) {
  //     window['Sharer'].init();
  //   }
  // }

  gotoLink() {
    this.addView();
    if (this.isBrowser) {
      window.open(this.myad.link, '_blank');
    }
  }

  addView() {
    this.service.store('ads-view/' + this.myad.id).subscribe((res: any) => {
      //
    });
  }

  loadSimilarContacts() {
    const data = {
      subcategory_ids: [this.blog.subcategory_id],
    };
    this.service.store('clinics', data).subscribe((res: any) => {
      this.similarContacts = res.data;
    });

  }
}
