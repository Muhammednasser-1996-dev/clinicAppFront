import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, Meta, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from './components/auth/verify-account/verify-account.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ShareContactComponent } from './components/share-contact/share-contact.component';
import { ContactRequestComponent } from './components/contact-request/contact-request.component';
import { ContactCommentComponent } from './components/contact-comment/contact-comment.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { ContactCardItemComponent } from './components/contact-card-item/contact-card-item.component';
import { AdsCardItemComponent } from './components/ads-card-item/ads-card-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './shared/interceptors';
import { FavouritePageComponent } from './components/favourite-page/favourite-page.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogSearchComponent } from './components/blog/blog-search/blog-search.component';
import { BlogItemComponent } from './components/blog/blog-item/blog-item.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactHoursComponent } from './components/contact-hours/contact-hours.component';
import { MetadataServiceService } from './shared/services/metadata-service.service';
import { HOST_URL } from './tokens/host-urls';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    NewPasswordComponent,
    SearchResultComponent,
    ShareContactComponent,
    ContactRequestComponent,
    ContactCommentComponent,
    ContactViewComponent,
    ContactCardItemComponent,
    AdsCardItemComponent,
    FavouritePageComponent,
    ProfileComponent,
    PrivacyComponent,
    TermsComponent,
    ForgetPasswordComponent,
    BlogListComponent,
    BlogSearchComponent,
    BlogItemComponent,
    BlogDetailsComponent,
    AboutComponent,
    ContactComponent,
    ContactHoursComponent,
  ],
  providers: [
    httpInterceptorProviders,
    Meta, Title
  ],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule, // Ensure this is imported
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserModule.withServerTransition({ appId: 'clinicAppFront' }),
  ]
})
export class AppModule { }
