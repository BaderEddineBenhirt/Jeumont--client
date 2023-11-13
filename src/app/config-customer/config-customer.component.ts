import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-config-customer',
  templateUrl: './config-customer.component.html',
  styleUrls: ['./config-customer.component.scss']
})
export class ConfigCustomerComponent implements OnInit {
  form!: FormGroup; 
  ships: any[] = [];
  customers: any[] = [];
  fleets: any[] = [];
  idCustomer: string = ''; 
  idFleet: number = 0; 
  uuidShip: string = '';
  nameShip!: string;
  descShip!: string;
  nameFleet!: string;
  descFleet!: string;


  isCreationShipVisible:  boolean = false;  
  isCreationFleetVisible: boolean = false;
  isUpdateShipVisible:    boolean = false;  
  isUpdateFleetVisible:   boolean = false;


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private infosService: InfosService, 
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customer_name: [''],
      customer_description: [''],
      customer_siret: ['']
    });
    this.fetchShips();
    this.fetchFleets();
    this.fetchCustomers();
  }

  private fetchShips(): void {
    this.infosService.getShips().subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur lors de la récupération des navires:', error);
      }
    );
  }

  private fetchShipsByFleet(fleetid: number): void {
    this.infosService.getShipsByFleet(fleetid).subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur lors de la récupération des navires:', error);
      }
    );
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }
  
  private fetchFleets(): void {
    this.infosService.getFleets().subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur lors de la récupération des fleets:', error);
      }
    );
  }

  private fetchFleetsByCustomer(cutomerUuid: string): void {
    this.infosService.getFleetsByCustomer(cutomerUuid).subscribe(
      data => {
        console.log(data, "data test");
        if (data) {
          this.fleets = data;
        } else {
          this.fleets = [];
        }
      },
      error => {
        console.error('Erreur lors de la récupération des fleets:', error);
      }
    );
  }

  toggleCreationShip() {
    if ( this.idFleet !== 0 ){
      this.isCreationShipVisible = !this.isCreationShipVisible;
    } else {
      alert('Chose a fleet');
    }
  }

  toggleCreationFleet() {
    if ( this.idCustomer !== '' ){
      this.isCreationFleetVisible = !this.isCreationFleetVisible;
    } else {
      alert('Chose a customer');
    }
  }

  toggleUpdateShip() {
    if ( this.uuidShip !== '' ) {
      this.isUpdateShipVisible = !this.isUpdateShipVisible;
    }
  }

  toggleUpdateFleet() {
    if ( this.idFleet !== 0 ){
      this.isUpdateFleetVisible = !this.isUpdateFleetVisible;
    }
  }

  onSubmit () {
    const formData = this.form.value;

    this.customerService.createCustomer(formData).subscribe(
      response => {
        console.log('Customer created successfully:', response);
        alert('Customer created successfully');
        this.form.reset();
        this.fetchCustomers();
      },
      error => {
        console.error('Error creating user:', error);
      }
    );

  }  

  selectCustomer(customerUuid: string) {
    this.idCustomer = customerUuid;

    if (customerUuid === '') {
      this.fetchFleets();
    } else {
      this.fetchFleetsByCustomer(customerUuid);
    } 
  }

  selectFleet(fleetId: number, nameFleet: string, descFleet: string) {
    this.idFleet = fleetId;
    this.nameFleet = nameFleet;
    this.descFleet = descFleet;
    if (fleetId === 0) {
      this.fetchShips();
    } else {
      this.fetchShipsByFleet(fleetId);
    } 
  }

  selectShip(shipUuid: string, nameShip: string, descShip: string ){
    this.uuidShip = shipUuid;
    this.nameShip = nameShip;
    this.descShip = descShip;
  }

  createNewShip() {
    const data = {
      ship_name: this.nameShip, 
      fleet_id: this.idFleet
    }    

    this.infosService.createShip(data).subscribe(
      response => {
        this.isCreationShipVisible = !this.isCreationShipVisible;
        this.nameShip= '';
        this.idCustomer='';
        this.uuidShip = '' ;
        this.idFleet = 0;
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
      },
      error => {
        console.error('Error creating ship:', error);
      }
    );
  }

  createNewFleet() {
    const data = {
      fleet_name: this.nameFleet, 
      fleet_description: this.descFleet,
      customer_uuid: this.idCustomer
    }    

    this.infosService.createFleet(data).subscribe(
      response => {
        this.isCreationFleetVisible = !this.isCreationFleetVisible;
        this.nameFleet= '';
        this.descFleet= '';        
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer= '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
      },
      error => {
        console.error('Error creating ship:', error);
      }
    );
  }

  updateFleet() {
    const data = {
      fleet_name: this.nameFleet, 
      fleet_description: this.descFleet,
    }

    this.infosService.updateFleet(data, this.idFleet).subscribe(
      response => {
        this.isUpdateFleetVisible = !this.isUpdateFleetVisible;
        this.nameFleet= '';
        this.descFleet= '';        
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer = '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
      },
      error => {
        console.error('Error updating ship:', error);
      }
    );
  }

  updateShip() {
    const data = {
      ship_name: this.nameShip, 
      ship_description: this.descShip,
    }

    console.log(data);

    this.infosService.updateShip(data, this.uuidShip).subscribe(
      response => {
        this.isUpdateShipVisible = !this.isUpdateShipVisible;
        this.nameShip= '';
        this.descShip= '';
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer = '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
      },
      error => {
        console.error('Error updating ship:', error);
      }
    );
  }
}
