import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedTitleService } from '../services/shared-title.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = true; 
  customers: any[] = []; 
  
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,    
    private sharedTitleService: SharedTitleService,
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''] // Correspond au champ de recherche
    });
  }

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('searchClient');
    this.fetchCustomers(); 
  }

  fetchCustomers(): void {
    const searchQuery = this.searchForm.value.searchQuery;
    this.customerService.getCustomers(searchQuery).subscribe(
      data => {
        this.customers = data; 
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching customers:', error);
      }
    );
  }
}