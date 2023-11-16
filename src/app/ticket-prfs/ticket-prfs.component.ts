import { Component, Input, OnInit } from '@angular/core';
import { InfosService } from '../services/infos.service';
import { OnCallService } from '../services/on-call.service';
import { getISOWeek } from 'date-fns';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket-prfs',
  templateUrl: './ticket-prfs.component.html',
  styleUrls: ['./ticket-prfs.component.scss'],
})
export class TicketPrfsComponent implements OnInit {
  @Input() data: any;
  @Input() idAsked: any;
  tagsAsked: any[] = [];
  isExpanded: boolean = false;
  onCallsWeek: any[] = [];
  currentRoute!: string;
  curentRole? :boolean;
    curentAdmin? :boolean;

  constructor(
    private router: Router,
    private onCallService: OnCallService,
    private authService:AuthService,
    private infosService: InfosService
  ) {
    
  }
 
  isshowed(){
    return this.currentRoute.startsWith('/client')
  }

  ngOnInit(): void {
    this.getOnCallNextWeek();
    this.fetchAskedTags();
    this.redirect();
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  private fetchAskedTags(): void {
    if (this.idAsked !== null) {
      // Vérifiez que customerUuid n'est pas null
      this.infosService.getTagsByAsked(this.idAsked).subscribe(
        (data) => {
          this.tagsAsked = data;
          console.log(this.tagsAsked);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des types d'effet:",
            error
          );
        }
      );
    }
  }

  getOnCallNextWeek() {
    this.onCallService.findOnChangeId(this.idAsked).subscribe(
      (data) => {
        this.onCallsWeek = data;
      
      },
      (error) => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }
  redirect() {
    const userRole = this.authService.getUserRole();
  
    if (userRole === 1 || userRole === 2 || userRole === 3 || userRole === 4) {
      this.curentAdmin=true
    } else if (userRole === 10 || userRole === 11 || userRole === 12) {
      this.curentRole=true
    }
  }
}
