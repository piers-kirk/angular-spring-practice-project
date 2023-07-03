import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-and-login',
  templateUrl: './sign-up-and-login.component.html',
  styleUrls: ['./sign-up-and-login.component.sass'],
})
export class SignUpAndLoginComponent {
  constructor(private router: Router) {}
  navigateToRoute(buttonName: string) {
    if (buttonName === 'signUp') {
      this.router.navigate(['menu']);
    } else {
      this.router.navigate(['menu']);
    }
  }
}
