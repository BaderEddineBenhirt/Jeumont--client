import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { getISOWeek } from 'date-fns';
import { OnCallService } from '../services/on-call.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  currentRoute!: string;
  isMenuVisible: boolean = false;
  isCreationTicketVisible: boolean = false;  
  menuImgSrc: string = 'assets/icons/menu.png';
  title!: string;
  onCallsThisWeek: any[] = [];
  onCallsLastWeek: any[] = [];
  onCallsNextWeek: any[] = [];
  isHovered: boolean = false;
  mail!: string;

  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentWeek: number = getISOWeek(this.currentDate);
  lastWeek: number = this.currentWeek - 1 ;
  nextWeek: number = this.currentWeek + 1 ;

  constructor(
    private onCallService: OnCallService,
    private sharedTitleService: SharedTitleService,
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit() {
    this.sharedTitleService.currentTitle.subscribe((newTitle) => {
      this.title = newTitle;
    });
    this.getOnCallThisWeek();
    this.getOnCallLastWeek();
    this.getOnCallNextWeek();
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
    this.menuImgSrc = this.isMenuVisible ? 'assets/icons/menu-close.png' : 'assets/icons/menu.png';
  }

  isTechnnavRoute(): boolean {
    // Check if the current route is '/technnav'
    return this.currentRoute === '/technnav';
  }

  isTechnnavChildRoute(): boolean {
    // Check if the current route starts with '/technnav/'
    return this.currentRoute.startsWith('/technnav/');
  }

  toggleCreationTicket() {
    this.isCreationTicketVisible = !this.isCreationTicketVisible;
  }

  createTicket() {
    this.toggleMenu();
    this.toggleCreationTicket();
  }

  getOnCallThisWeek () {
    this.onCallService.findOnCallsBySemaine(this.currentWeek, this.currentYear).subscribe(
      data => {
        console.log('this week', data);
        this.onCallsThisWeek = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getOnCallLastWeek () {
    this.onCallService.findOnCallsBySemaine(this.lastWeek, this.currentYear).subscribe(
      data => {
        console.log('last week', data);
        this.onCallsLastWeek = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getOnCallNextWeek () {
    this.onCallService.findOnCallsBySemaine(this.nextWeek, this.currentYear).subscribe(
      data => {
        console.log('next week', data);
        this.onCallsNextWeek = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }
}
