import { Component } from '@angular/core';
import { ShowService } from './show.service';
import { FormBuilder } from '@angular/forms';
import { Show } from './show.interface';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
})
export class ShowComponent {
  constructor(
    private showService: ShowService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getShows();
  }

  showForm = this.formBuilder.group({
    showName: null,
    streamingPlatform: null,
    genre: null,
  });

  shows: Show[];
  stateObj: any;

  getShows(): void {
    this.showService.getShows().subscribe((shows) => {
      this.shows = shows;
    });
  }

  public addShow() {
    this.showService.save(this.showForm.getRawValue()).subscribe({
      next: (data: any) => {
        this.showForm.reset();
        this.getShows();
      },
      error: (err: any) => {
        console.log('addShow() failed: ', err);
      },
    });
  }

  public deleteShow() {
    if (0 < this.shows.length && this.shows.at(length - 1)) {
      const Show = this.shows.at(length - 1);
      if (Show?.id) {
        this.showService.delete(Show.id).subscribe({
          next: (data: any) => {
            this.getShows();
          },
          error: (err: any) => {
            console.log('deleteShow() failed: ', err);
          },
        });
      }
    }
  }
}
