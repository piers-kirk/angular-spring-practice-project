import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  constructor(private router: Router) {}
  navigateToRoute(endpoint: any) {
    this.router.navigate([endpoint]);
  }
}
