import { Component } from '@angular/core';
import { ShowSummaryTableService } from './show-summary-table.service';
import { FormBuilder } from '@angular/forms';
import { Show } from '../interfaces/show.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'show-summary-table',
  templateUrl: './show-summary-table.component.html',
  styleUrls: ['./show-summary-table.component.sass'],
})
export class ShowSummaryTableComponent {
  constructor(
    private showSummaryTableService: ShowSummaryTableService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
    this.showSummaryTableService.selectAll().subscribe((shows) => {
      this.shows = shows;
      this.shows.map((show) => {
        show.checkbox = false;
      });
    });
  }

  public addShow() {
    this.showSummaryTableService.save(this.showForm.getRawValue()).subscribe({
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
      if (Show?.showId) {
        this.showSummaryTableService.delete(Show.showId).subscribe({
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
      .map((show) => show.showId);
    if (0 < showIds.length) {
      this.showSummaryTableService.delete(showIds).subscribe({
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
    this.showSummaryTableService.export().subscribe({
      next: (response: Blob) => {
        const blobURL = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = blobURL;
        a.target = '_blank';
        a.click();
      },
      error: (err: any) => {
        console.log('exportShows() failed: ', err);
      },
    });
  }

  navigateToShowDetailForm(showId: any) {
    this.router.navigate(['shows/showDetail/', showId]);
  }
}
