import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-prmp',
  templateUrl: './ticket-prmp.component.html',
  styleUrls: ['./ticket-prmp.component.scss']
})
export class TicketPrmpComponent {
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

