// shared-title.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SharedTitleService {
  private titleSource = new BehaviorSubject<string>('Default Title');
  currentTitle = this.titleSource.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  private getHeaders(): HttpHeaders {
    const accessToken = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
  }

  changeTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }
  private apiUrl = Constants.apiUrl;
  getUserDocuments(userid : any): Observable<any> {
    return this.http.get(`${this.apiUrl}/documentfor/${userid}`, { headers: this.getHeaders() });
  }


  
}
