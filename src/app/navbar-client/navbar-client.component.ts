import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent {
  currentRoute!: string;
  isMenuVisible = false;
  isModalVisible = false;
  menuImgSrc: string = 'assets/icons/menu.png';
   isCreationTicketVisible: boolean = false;  

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
    this.menuImgSrc = this.isMenuVisible ? 'assets/icons/menu-close.png' : 'assets/icons/menu.png';
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

   isClientRoute(): boolean {
    // Check if the current route is '/technnav'
    return this.currentRoute === '/client';
  }
createTicket() {
    this.toggleMenu();
    this.toggleCreationTicket();
  }
   toggleCreationTicket() {
    this.isCreationTicketVisible = !this.isCreationTicketVisible;
  }
  isTechnnavChildRoute(): boolean {
    // Check if the current route starts with '/technnav/'
    return this.currentRoute.startsWith('/client/');
  }

  toggleModalAndMenu() {
    this.toggleModal();
    this.toggleMenu();
     
  }
}
