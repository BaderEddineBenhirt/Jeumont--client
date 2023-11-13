import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentRoute!: string;
  isLanguageOverlayVisible: boolean = false;


  constructor(
    private router: Router,   
    private authService: AuthService, 
    private translateService: TranslateService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  toggleLangage() {
    this.isLanguageOverlayVisible = !this.isLanguageOverlayVisible;
  }



  shouldDisplayButtons(): boolean {
    const currentRoute = this.router.url;

    return currentRoute.startsWith('/client') || currentRoute.startsWith('/technnav');
  }

  shouldDisplayButtonsToAdmin(): boolean {
    const currentRoute = this.router.url;

    return currentRoute.startsWith('/client');
  }

  
  logout(){
    this.authService.logout()
  }

  redirect() {
    const userRole = this.authService.getUserRole();
  
    if (userRole === 1 || userRole === 2 || userRole === 3 || userRole === 4) {
      this.router.navigate(['/technnav']);
    } else if (userRole === 10 || userRole === 11 || userRole === 12) {
      this.router.navigate(['/client']);
    }
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang); 
    this.toggleLangage();
  }
  
}
