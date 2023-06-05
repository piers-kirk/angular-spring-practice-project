import { Component } from '@angular/core';
import { ShowService } from './show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
})
export class ShowComponent {
  constructor(private showService: ShowService) {}
  getShows(event: any) {
    this.showService.getShows().subscribe((shows) => {
      console.log(shows);
    });
  }

  save(event: any) {
    this.showService.getShows().subscribe((shows) => {
      console.log(shows);
    });
  }
}
