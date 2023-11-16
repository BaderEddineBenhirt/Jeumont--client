import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  currentUserUuid:string= "";
  documents:any;
  constructor(
    private sharedTitleService: SharedTitleService,
    private cookieService:CookieService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchDocument');
     this.currentUserUuid = this.cookieService.get('user_uuid');
     this.sharedTitleService.getUserDocuments(this.currentUserUuid).subscribe( data =>{
      this.documents=data
      this.documents.forEach((doc :any) => {
        doc.formattedDate = this.formatDate(doc.doc_created_date);
        doc.formattedDateUpdate = this.formatDate(doc.doc_updated_date);
      });
      console.log(this.documents);
     });
  }
 private formatDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return this.datePipe.transform(parsedDate, 'dd/MM/yyyy') || '';
  }
}
