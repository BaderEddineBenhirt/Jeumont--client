import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { SharedTitleService } from '../services/shared-title.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerUuid!: string | null;
  customer: any;
  fleets: any[] = [];
  ships: any[] = [];
  isLoading: boolean = true; // Ajout de la variable isLoading
  shipName: string = '';
  shipDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private sharedTitleService: SharedTitleService,
  ) {}

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('CLIENT INFORMATIONS');
    this.route.paramMap.subscribe(params => {
      this.customerUuid = params.get('customer_uuid');
      if (this.customerUuid) {
        this.fetchCustomerData();
      }
    });
  }

  fetchCustomerData(): void {
    if (this.customerUuid !== null) { // Vérifiez que customerUuid n'est pas null
      this.customerService.getCustomerById(this.customerUuid).subscribe(
        data => {
          this.customer = data;
          this.fetchCustomerFleets();
          this.fetchCustomerShips();
          this.isLoading = false; // Désactiver le chargement
        },
        error => {
          console.error('Error fetching customer details:', error);
          this.isLoading = false; // Désactiver le chargement en cas d'erreur
        }
      );
    }
  }

  fetchCustomerFleets(): void {
    this.customerService.getFleetByCustomer(this.customerUuid!).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Error fetching customer fleets:', error);
      }
    );
  }

  fetchCustomerShips(): void {
    this.customerService.getShipByCustomer(this.customerUuid!).subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Error fetching customer ships:', error);
      }
    );
  }

  shipDesc(shipName: string, shipDescription : string) {
    this.shipName = shipName;
    this.shipDescription = shipDescription;
  }


}
