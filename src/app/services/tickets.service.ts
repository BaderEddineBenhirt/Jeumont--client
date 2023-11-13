import { Constants } from '../utils/constants'; 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous d'importer AuthService

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = Constants.apiUrl; 

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

  getAskedDataSF(sort: string): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '');
    return this.http.get(`${this.apiUrl}/asked`, { headers: this.getHeaders(), params });
  }


  getAskedData(page: number, description: string, sort: string, typeFilter: string, statusFilter: number, clientFilter: string, sortOption: string): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '')
      .set('page', page || 1);

    if (description) {
      params = params.set('asked_description', description);
    }

    if (typeFilter) {
      params = params.set('typeFilter', typeFilter);
    }

    if (statusFilter) {
      params = params.set('statusFilter', statusFilter);
    }

    if (clientFilter) {
      params = params.set('clientFilter', clientFilter);
    }

    if (sortOption) {
      params = params.set('sortOption', sortOption);
    }


    return this.http.get(`${this.apiUrl}/asked`, { headers: this.getHeaders(), params });
  }


  getAskedDataStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asked/statistics`, { headers: this.getHeaders()});
  }

  getAskedDataChart(selectedDuration: number, client: string, ship: string): Observable<any> {
    let params = new HttpParams()

    if ( client ) {
      params = params.set('client', client);
    }

    if ( ship ) {
      params = params.set('ship', ship);
    }

    return this.http.get(
      `${this.apiUrl}/asked/chart?selectedDuration=${selectedDuration}`, 
      { headers: this.getHeaders(), params }
    );
  }
  
  getOneAskedData(asked_uuid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/asked/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getOneAskedPRFSData(asked_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfs/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getAskedPRFM(): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfm`, { headers: this.getHeaders() });
  }

  createAskedPRFS(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfs`, data, { headers: this.getHeaders() });
  }

  createAskedUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedusersincharge`, data, { headers: this.getHeaders() });
  }

  updateAskedPRFS(data: any, asked_uuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/prfs/${asked_uuid}`, data, { headers: this.getHeaders() });
  }

  askedAddTag(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedTag`,  data ,{ headers: this.getHeaders() });
  }

  askedDeleteTag(tag_id: number, asked_uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/askedTag/${asked_uuid}/${tag_id}` ,{ headers: this.getHeaders() });
  }

  askedAddEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedEffect`,  data ,{ headers: this.getHeaders() });
  }

  askedDeleteEvent(effect_id: number, asked_uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/askedEffect/${asked_uuid}/${effect_id}` ,{ headers: this.getHeaders() });
  }

  uploadFile(formData: FormData, askedUuid: string, userUuid: string) {
    return this.http.post(`${this.apiUrl}/prfs/upload/${askedUuid}/${userUuid}`, formData);
  }

  getAttachements(askedUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfs/attachement/${askedUuid}` ,{ headers: this.getHeaders() });
  }

  downloadAttachement(filename: string): Observable<Blob>  {
    return this.http.get(`${this.apiUrl}/prfs/attachement/files/${filename}` , {
      responseType: 'blob' // This indicates that the response should be treated as a binary blob
    });
  }

  removeAttachement(attId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/prfs/attachement/${attId}`, {
      headers: this.getHeaders(),
      responseType: 'text',
    });
  }
}
