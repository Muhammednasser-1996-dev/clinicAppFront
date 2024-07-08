import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { HOST_URL } from 'src/app/tokens/host-urls';


export interface PageMetadata {
  title: string;
  // image will be added later
  description: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'App Title',
  description: 'App description',
  author: 'Daniil Baunov',
  keywords: ['Angular', 'meta tags', 'Angular Universal'],
  type: 'website',
}


@Injectable({
  providedIn: 'root'
})
export class MetadataServiceService {
  constructor(private meta: Meta, private title: Title) { }

  updateMetadata(metaData: { title: string, description: string }) {
    this.title.setTitle(metaData.title);
    this.meta.updateTag({ name: 'description', content: metaData.description });
    this.meta.updateTag({ property: 'og:title', content: metaData.title });
    this.meta.updateTag({ property: 'og:description', content: metaData.description });
  }
}
