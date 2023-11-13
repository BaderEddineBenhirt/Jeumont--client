import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPilot } from 'daypilot-pro-angular';
import { HttpClient } from "@angular/common/http";
import { InfosService } from '../services/infos.service';
import { OnCallService } from '../services/on-call.service';

@Injectable()
export class DataService {
  public nextId = 1;
  resources: any[];
  childrens: any[] = [];
  eventsSupport: any[] = [];
  events: any[];

  constructor(
    private onCallService: OnCallService,
    private infosService: InfosService,
  ){

    this.infosService.getUsersSkill().subscribe(
      data => {
        console.log(data);
        data.forEach((userskill: any, index: number) => {
          this.childrens.push({
            name: `${userskill.user_first_name} ${userskill.user_name}`,
            id: userskill.user_uuid
          });
        });    
        console.log(this.childrens)
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );

    console.log(this.childrens, 'Childrens');

    this.onCallService.findOnCalls().subscribe(
      data => {
        data.forEach((event: any) => {
          if ( event.primary_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason} : Primary`, event.user_uuid);
          } else if ( event.emergency_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason} : Emergency`, event.user_uuid);
          }
        })
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );

    
    this.resources = [
      { 
        name: "Support", 
        id: "support", 
        expanded: true, 
        children: this.childrens
      },
    ];

    console.log(this.eventsSupport, 'Events support');
    
    this.events = this.eventsSupport;

    console.log(this.events, 'Events');
  }

  getAddEvent(year: number, weekNumber: number, text: string,  user_id: string) {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = this.getEndDateOfWeek(year, weekNumber);

    this.events.push({
      id: this.nextId,
      resource: user_id,
      start: new Date(startDate),
      end: new Date(endDate),
      text: text
    })

    this.nextId++;
  }

  private getStartDateOfWeek(year: number, weekNumber: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;

    const startOfWeek = new Date(januaryFirst);
    startOfWeek.setDate(januaryFirst.getDate() + (7 - januaryFirst.getDay()) + daysOffset);

    return startOfWeek;
  }

  private getEndDateOfWeek(year: number, weekNumber: number): Date {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return endDate;
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

  }

  getResources(): Observable<any[]> {

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });
  }
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}
