import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Util } from 'src/app/app/utils/util';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  navigationOptions: any = [
    {
      name: '1',
      color: '#5B37B7',
    },
    {
      name: '2',
      color: '#C9379D',
    },
    {
      name: '3',
      color: '#1892A6',
    },
  ];
  page: any;
  isMobile = false;
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,    @Inject(DOCUMENT) private document: Document) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = Util.isMobile();
  
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.page = window.location.pathname.replace('/', '');
    }
    setTimeout(() => {
      this.initNavScript();
    }, 300);
  }

  initNavScript() {
    // target all anchor link elements
    if (this.isBrowser) {
      const links = this.document.querySelectorAll('nav a');
      var self = this;

      // function called in response to a click event on the anchor link
      function handleClick(e: any) {
        var _this: any = e.target;
        // prevent the default behavior, but most importantly remove the class of .active from those elements with it
        e.preventDefault();
        links.forEach((link) => {
          if (link.classList.contains('active')) {
            link.classList.remove('active');
          }
        });

        // retrieve the option described the link element
        const name = _this.getAttribute('data-index');
        // find in the array the object with the matching name
        // store a reference to its color
        const { color } = self.navigationOptions.find(
          (item: any) => item.name === name
        );

        // retrieve the custom property for the --hover-c property, to make it so that the properties are updated only when necessary

        const style = window.getComputedStyle(_this);
        const hoverColor = style.getPropertyValue('--hover-c');
        // if the two don't match, update the custom property to show the hue with the text and the semi transparent background
        if (color !== hoverColor) {
          _this.style.setProperty('--hover-bg', `${color}20`);
          // _this.style.setProperty('--hover-c', color);
        }

        // apply the class of active to animate the svg an show the span element
        _this.classList.add('active');
        // change the color of the background of the application to match
        // document.querySelector('body').style.background = color;
      }

      // listen for a click event on each and every anchor link
      links.forEach((link) => link.addEventListener('click', handleClick));
    }
  }
}
