import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  // Adresse e-mail que vous souhaitez copier
  emailAddress: string = 'Email@jeumontelectric.com';
  buttonText: string = 'Copy to clipboard';

  constructor(private clipboard: Clipboard) {}

  copyToClipboard(): void {
    this.clipboard.copy(this.emailAddress);
    this.buttonText = 'Copied to clipboard!';
    // Reset the button text after 2 seconds
    setTimeout(() => {
      this.buttonText = 'Copy to clipboard';
    }, 2000);
  }
}
