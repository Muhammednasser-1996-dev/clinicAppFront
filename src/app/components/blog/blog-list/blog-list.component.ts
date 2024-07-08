import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AdsManager } from 'src/app/app/models/adsManager';
import { Auth } from 'src/app/app/models/auth';
import { DB } from 'src/app/app/models/db';
import { Util } from 'src/app/app/utils/util';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  categories: any = [];
  blogs: any = [];
  selectedCategoryId: any = null;
  search: any = '';
  isLoading: boolean = false;
  ads: any[] = [];
  myad: any = {};
  filterData: any = {};
  totalPages = 1;
  currentPage = 1;
  page = 1;
  lang: any;
  loadedPage = 1;

  constructor(
    private service: GlobalService,
    private route: Router,
    private r: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.lang = Auth.locale();
    this.loadMyAd();

    // Initialize component based on query params
    r.queryParams.subscribe(params => {
      this.selectedCategoryId = params['category_id'] || null;
      this.search = params['search'] || '';
      this.initializeComponent();
    });
  }

  ngOnInit(): void {
    this.loadBlogCategories();
    this.loadAds();

    // For SSR, ensure initial data load
    if (!isPlatformBrowser(this.platformId)) {
      this.loadBlogs();
    }
  }

  // Initialize component based on query params
  private initializeComponent() {
    // For client-side rendering, ensure loadBlogs is called after initial data is ready
    if (isPlatformBrowser(this.platformId)) {
      this.loadBlogs();
    }
  }

  selectCategory(id: any) {
    this.selectedCategoryId = id;
    Util.refreshComponent(this.route, "/blog", null, { category_id: id });
  }

  loadBlogCategories() {
    // Load blog categories from cache or service
    if (isPlatformBrowser(this.platformId) && DB.has('blogCategories')) {
      this.categories = DB.get('blogCategories');
    }
    this.service.store('blog-categories').subscribe((res: any) => {
      this.categories = res;
      if (isPlatformBrowser(this.platformId)) {
        DB.set('blogCategories', res);
      }
    });
  }

  loadMyAd() {
    // Load ad for the component
    this.myad = AdsManager.getInstance(PLATFORM_ID).getAdd(true);
    if (this.myad) {
      this.myad.type = "blog";
    }
  }

  // Load blogs with optional pagination (appends)
  loadBlogs(appends: any = false) {
    this.isLoading = true;

    // Check for online status and use cached data if offline
    if (isPlatformBrowser(this.platformId) && !window.navigator.onLine) {
      const cachedBlogs = DB.get('blogs');
      if (cachedBlogs) {
        this.blogs = cachedBlogs;
        this.isLoading = false;
        return; // Exit early since we have cached data
      }
    }

    // Construct filter data for API call
    this.filterData = {
      category_id: this.selectedCategoryId,
      search: this.search,
      page: this.page
    };

    // Call service to fetch blogs
    this.service.store('blogs', this.filterData).subscribe((res: any) => {
      this.loadedPage = res.current_page;
      this.totalPages = res.total_pages;
      this.currentPage = res.current_page;
      this.filterData.total_entries = res.total;
      this.filterData.with_phone = res.with_phone;
      this.filterData.without_phone = res.without_phone;

      // Append or replace blogs based on appends flag
      if (!appends) {
        this.blogs = res.data;
      } else {
        this.blogs = this.blogs.concat(res.data);
      }

      // Additional data handling
      this.filterData.is_loading = false;
      this.filterData.is_gps_search = false;

      // Append ad if available
      if (this.myad?.id) {
        this.blogs.push(this.myad);
      }

      // Cache result only if window is defined (client-side)
      if (isPlatformBrowser(this.platformId)) {
        DB.set('blogs', this.blogs);
      }

      this.isLoading = false;
    });
  }

  // Load ads for the component
  loadAds() {
    if (isPlatformBrowser(this.platformId)) {
      this.ads = DB.get('mobile_ads') ?? [];
    }
    this.service.store('ads', { page: 'blog' }).subscribe((res: any) => {
      this.ads = res;
      if (isPlatformBrowser(this.platformId)) {
        DB.set('mobile_ads', res);
      }
    });
  }

  // Load more blogs when pagination is triggered
  loadMore() {
    if (this.isLoading) {
      return;
    }
    this.page += this.currentPage < this.totalPages ? 1 : 0;
    if (this.page != (this.totalPages + 1) && this.page != this.loadedPage) {
      this.loadBlogs(true);
    }
  }

  navigateToBlog(blog: any) {
    console.log(blog);
    
    this.route.navigate(['/blog', blog.title_ar]); // Ensure title_ar is not undefined
  }
}
