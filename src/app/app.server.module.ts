import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { MetadataServiceService } from './shared/services/metadata-service.service';
import { HOST_URL } from './tokens/host-urls';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule, // Ensure this is imported
    ServiceWorkerModule,
    TransferHttpCacheModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers:[MetadataServiceService,  { provide: HOST_URL, useValue: 'https://backend.raqm.online/api/blogs/id' },]
})
export class AppServerModule { }
