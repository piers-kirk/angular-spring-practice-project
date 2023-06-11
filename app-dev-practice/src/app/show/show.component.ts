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
  checkboxIsChecked: false;

  getShows(): void {
    this.showService.select().subscribe((shows) => {
      this.shows = shows;
      this.shows.map((show) => {
        show.checkbox = false;
      });
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

  deleteShows() {
    const showIds = this.shows
      .filter((show) => show.checkbox)
      .map((show) => show.id);
    if (0 < showIds.length) {
      this.showService.delete(showIds).subscribe({
        next: (data: any) => {
          this.getShows();
        },
        error: (err: any) => {
          console.log('deleteShows() failed: ', err);
        },
      });
    }
  }

  selectAllCheckboxes(isChecked: boolean): boolean {
    this.shows.map((show) => {
      show.checkbox = isChecked;
    });
    return isChecked;
  }

  updateCheckboxField(show: Show, isChecked: boolean) {
    show.checkbox = isChecked;
  }

  exportShows() {
    console.log('add a service call for printing here');
  }
}
