 
import { Component, HostListener, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  page: number = 1;
  isCreateTicketVisible = false;
  isLoading = true;
  tickets: any[] = [];
  sortOption: string = '';
  showFilter = false;
  showExport = false;
  customers: any[] = [];
  status: any[] = [];
  client: string = '';
  searchDescription: string = '';
  selectedOptionSort: string = 'asc';
  sortedBy: any;
  // Declare filters
  typeFilter: string = '';
  statusFilter: number = 0;
  exportType: string = '';
  font = 'Inter-Medium, Helvetica';
  fontWeight = 500;
  font1 = 'Inter-Medium, Helvetica';
  fontWeight1 = 500;
  font2 = 'Inter-Medium, Helvetica';
  fontWeight2 = 500;
  font3 = 'Inter-Medium, Helvetica';
  fontWeight3 = 500;
  font4 = 'Inter-Medium, Helvetica';
  fontWeight4 = 500;

  constructor(
    private ticketsService: TicketsService,
    private sharedTitleService: SharedTitleService,
    private infosService: InfosService
  ) {}

  ngOnInit() {
    this.fetchTickets();
    this.sharedTitleService.changeTitle('ONBOARDING');
    this.fetchCustomers();
    this.fetchStatus();
  }

  resetFilter() {
    this.isLoading = true;
    this.client = '';
    this.statusFilter = 0;
    this.typeFilter = '';
    this.fetchTickets();
    this.toggleFilter();
  }

  fetchStatus() {
    this.infosService.getStatuses().subscribe(
      (data) => {
        this.status = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }

  toggleCreateTicket() {
    this.isCreateTicketVisible = !this.isCreateTicketVisible;
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      (data) => {
        this.customers = data;
        console.log(this.customers);
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }

  applyTypeFilter(type: string) {
    this.typeFilter = type;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyStatusFilter(statusFilter: number) {
    this.statusFilter = statusFilter;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyClientFilter(client: string) {
    this.client = client;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }
  setFont() {
    
      this.font1 = 'Inter-Medium, Helvetica';
      this.fontWeight1 = 500;
      this.font2 = 'Inter-Medium, Helvetica';
      this.fontWeight2 = 500;
      this.font3 = 'Inter-Medium, Helvetica';
      this.fontWeight3 = 500;
      this.font4 = 'Inter-Medium, Helvetica';
      this.fontWeight4 = 500;
    this.sort('name');
    this.font =
      this.font === 'Inter-Medium, Helvetica'
        ? 'Inter-Bold, Helvetica'
        : 'Inter-Medium, Helvetica';
    this.fontWeight = this.fontWeight === 500 ? 700 : 500;
  }
  setFont1() {
    this.font = 'Inter-Medium, Helvetica';
    this.fontWeight = 500;
 
    this.font2 = 'Inter-Medium, Helvetica';
    this.fontWeight2 = 500;
    this.font3 = 'Inter-Medium, Helvetica';
    this.fontWeight3 = 500;
    this.font4 = 'Inter-Medium, Helvetica';
    this.fontWeight4 = 500;
     this.sort('creationDate');
    this.font1 =
      this.font1 === 'Inter-Medium, Helvetica'
        ? 'Inter-Bold, Helvetica'
        : 'Inter-Medium, Helvetica';
    this.fontWeight1 = this.fontWeight1 === 500 ? 700 : 500;
  }
  setFont2() {
    this.font = 'Inter-Medium, Helvetica';
    this.fontWeight = 500;
    this.font1 = 'Inter-Medium, Helvetica';
    this.fontWeight1 = 500;
 
    this.font3 = 'Inter-Medium, Helvetica';
    this.fontWeight3 = 500;
    this.font4 = 'Inter-Medium, Helvetica';
    this.fontWeight4 = 500;
      this.sort('lastupdate');
    this.font2 =
      this.font2 === 'Inter-Medium, Helvetica'
        ? 'Inter-Bold, Helvetica'
        : 'Inter-Medium, Helvetica';
    this.fontWeight2 = this.fontWeight2 === 500 ? 700 : 500;
  }
  setFont3() {
    this.font = 'Inter-Medium, Helvetica';
    this.fontWeight = 500;
    this.font1 = 'Inter-Medium, Helvetica';
    this.fontWeight1 = 500;
    this.font2 = 'Inter-Medium, Helvetica';
    this.fontWeight2 = 500;
 
    this.font4 = 'Inter-Medium, Helvetica';
    this.fontWeight4 = 500;
    this.sort('type');
    this.font3 =
      this.font3 === 'Inter-Medium, Helvetica'
        ? 'Inter-Bold, Helvetica'
        : 'Inter-Medium, Helvetica';
    this.fontWeight3 = this.fontWeight3 === 500 ? 700 : 500;
  }
  setFont4() {
    this.font = 'Inter-Medium, Helvetica';
    this.fontWeight = 500;
    this.font1 = 'Inter-Medium, Helvetica';
    this.fontWeight1 = 500;
    this.font2 = 'Inter-Medium, Helvetica';
    this.fontWeight2 = 500;
    this.font3 = 'Inter-Medium, Helvetica';
    this.fontWeight3 = 500;
   
     this.sort('ship');
    this.font4 =
      this.font4 === 'Inter-Medium, Helvetica'
        ? 'Inter-Bold, Helvetica'
        : 'Inter-Medium, Helvetica';
    this.fontWeight4 = this.fontWeight4 === 500 ? 700 : 500;
  }

  sort(name: string) {
    this.sortOption = name;
    this.isLoading = true;
    this.page = 1;
    this.tickets = [];
    this.fetchTickets();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.showExport = false;
  }

  toggleExport() {
    this.showExport = !this.showExport;
    this.showFilter = false;
  }

  fetchTickets() {
    this.ticketsService
      .getAskedData(
        this.page,
        this.searchDescription,
        this.sortOption,
        this.typeFilter,
        this.statusFilter,
        this.client,
        this.selectedOptionSort
      )
      .subscribe(
        (data) => {
          this.tickets = this.tickets.concat(data);
          console.log(this.tickets)
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données :', error);
          this.isLoading = false;
        }
      );
  }

  search() {
    this.isLoading = true;
    this.fetchTickets();
  }

  exportTypeSet(format: string) {
    this.exportType = format;
  }

  loadMoreData() {
    this.page++;
    this.isLoading = true;
    this.fetchTickets();
  }

  exportData() {
    if (this.exportType === 'csv') {
      this.exportToCsv();
    } else if (this.exportType === 'json') {
      this.exportToJson();
    } else if (this.exportType === 'xls') {
      this.exportToXls();
    } else if (this.exportType === 'pdf') {
      this.exportToPDF();
    } else {
      alert('chose type export');
    }
  }

  private exportToCsv() {
    const csvData = this.convertToCsv(this.tickets);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tickets.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private exportToJson() {
    const jsonData = JSON.stringify(this.tickets, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tickets.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCsv(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((item) => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  private exportToXls() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tickets);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
    XLSX.writeFile(wb, 'tickets.xlsx');
  }

  private exportToPDF() {
    const doc = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let yPosition = 10;
    const pageHeight = doc.internal.pageSize.height;

    this.tickets.forEach((ticket, index) => {
      const ticketData = `Ticket ${ticket.asked_ref}: ${ticket.asked_created_date}\nDescription: ${ticket.asked_description}`;
      const textLines = doc.splitTextToSize(ticketData, 180);

      if (yPosition + doc.getTextDimensions(textLines).h > pageHeight - 10) {
        doc.addPage();
        yPosition = 10;
      }

      doc.text(textLines, 10, yPosition);
      yPosition += doc.getTextDimensions(textLines).h + 10;
    });

    doc.save('tickets.pdf');
  }

  onSortOptionChange() {
    this.isLoading = true;
    this.fetchTickets();
  }
}
