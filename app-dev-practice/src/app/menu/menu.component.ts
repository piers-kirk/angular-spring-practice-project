import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  openNetflix(event: any) {
    window.open('https://www.netflix.com', '_blank');
  }

  openMax(event: any) {
    window.open('https://play.max.com', '_blank');
  }
}
