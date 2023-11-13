import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  currentRoute!: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }



  shouldDisplayButtonsToClient(): boolean {
    // Get the current route from the router
    const currentRoute = this.router.url;

    // Check if the current route starts with '/client' or '/technnav'
    return currentRoute.startsWith('/technnav');
  }

  shouldDisplayButtonsToAdmin(): boolean {
    // Get the current route from the router
    const currentRoute = this.router.url;

    // Check if the current route starts with '/client' or '/technnav'
    return currentRoute.startsWith('/client');
  }

}
