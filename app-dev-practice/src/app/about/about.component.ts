import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent {
  constructor(private location: Location) {}
  navigateToRoute() {
    this.location.back();
  }
}
