import { Component, OnInit } from '@angular/core';
import { InfosService } from '../services/infos.service';
import { UsersService } from '../services/users.service';
import { OnCallService } from '../services/on-call.service';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-config-planning',
  templateUrl: './config-planning.component.html',
  styleUrls: ['./config-planning.component.scss']
})
export class ConfigPlanningComponent implements OnInit {
  currentDate: Date = new Date();

  currentWeek: number = getISOWeek(this.currentDate);
  currentYear: number = this.currentDate.getFullYear();
  

  planningMonth: any[] = [];
  weeks: any[] = [];
  years: any[] = [];
  idWeek: number = 0;
  idYear: number = 0;
  userEmailPrim: string = '';
  userEmailEmer: string = '';
  userId: string = '';
  suggestionsPrim: any[] = [];
  suggestionsEmer: any[] = [];
  weeksTo: number[] = [];

  constructor(
    private infosService: InfosService, 
    private usersService: UsersService, 
    private onCallService: OnCallService,
  ) {}

  ngOnInit(): void {
    this.fetchWeeks();
    this.fetchYears();
  }
  
  fetchWeeks() {
    this.infosService.getWeeks().subscribe(
      data => {
        this.weeks = data;
      },
      error => {
        console.error('Erreur lors de la récupération des semaines:', error);
      }
    );
  }

  fetchYears() {
    this.infosService.getYears().subscribe(
      data => {
        this.years = data;
      },
      error => {
        console.error('Erreur lors de la récupération des annees:', error);
      }
    );
  }

  onInputChange() {
    this.searchUsers();
  }

  searchUsers() {

    if (this.userEmailEmer.trim() !== '') {
      this.usersService.findUsersTech(this.userEmailEmer).subscribe(
        (data) => {
          this.suggestionsEmer = data;
        },
        (error) => {
          console.error('Error searching for users:', error);
        }
      );
    } else if (this.userEmailPrim.trim() !== '') {
      this.usersService.findUsersTech(this.userEmailPrim).subscribe(
        (data) => {
          this.suggestionsPrim = data;
        },
        (error) => {
          console.error('Error searching for users:', error);
        }
      );
    } else {
      this.suggestionsEmer = [];
      this.suggestionsPrim = [];
    }
  }

  selectSuggestionEmer(suggestion: string, user_uuid: string) {
    this.userId = user_uuid
    this.userEmailEmer = suggestion;
    this.suggestionsEmer = [];
  }

  selectSuggestionPrim(suggestion: string, user_uuid: string) {
    this.userId = user_uuid
    this.userEmailPrim = suggestion;
    this.suggestionsPrim = [];
  }

  onSubmitPrim() {
    const data = {
      user_uuid: this.userId,  
      week_id: this.idWeek,
      year_id: this.idYear, 
      primary_backup: true,
      emergency_backup: false
    }

    this.onCallService.createOnCall(data).subscribe(
      response => {
        console.log('PLANNING created successfully:', response);
        alert('PLANNING created successfully')
        alert('PLANNING created successfully');
        this.idWeek = 0;
        this.idYear = 0;
        this.userEmailPrim = '';
        this.userEmailEmer = '';
        this.userId = '';
        this.suggestionsPrim = [];
        this.suggestionsEmer = []; 
      },
      error => {
        console.error('Error creating planning:', error);
      }
    )
  }

  onSubmitEmer() {
    const data = {
      user_uuid: this.userId,  
      week_id: this.idWeek,
      year_id: this.idYear, 
      primary_backup: false,
      emergency_backup: true
    }

    this.onCallService.createOnCall(data).subscribe(
      response => {
        console.log('PLANNING created successfully:', response);
        alert('PLANNING created successfully');
        
        this.idWeek = 0;
        this.idYear = 0;
        this.userEmailPrim = '';
        this.userEmailEmer = '';
        this.userId = '';
        this.suggestionsPrim = [];
        this.suggestionsEmer = []; 
      },
      error => {
        console.error('Error creating planning:', error);
      }
    )
  }

}
