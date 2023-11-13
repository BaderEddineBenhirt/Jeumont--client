import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  
  constructor(
    private sharedTitleService: SharedTitleService,
  ) {}

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchDocument');
  }
}
