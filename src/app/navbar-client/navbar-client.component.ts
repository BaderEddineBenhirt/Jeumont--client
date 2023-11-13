import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent {
      
  isMenuVisible = false;
  isModalVisible = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleModalAndMenu() {
    this.toggleModal();
    this.toggleMenu();
  }
}
