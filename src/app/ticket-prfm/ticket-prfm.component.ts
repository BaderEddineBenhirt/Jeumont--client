import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-prfm',
  templateUrl: './ticket-prfm.component.html',
  styleUrls: ['./ticket-prfm.component.scss']
})
export class TicketPrfmComponent {
  @Input() data: any;

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }
}

