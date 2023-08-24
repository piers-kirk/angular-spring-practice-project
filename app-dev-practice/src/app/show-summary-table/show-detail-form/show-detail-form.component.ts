import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowSummaryTableService } from '../show-summary-table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { Show } from 'src/app/interfaces/show.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ShowDetails } from 'src/app/interfaces/showDetails.interface';

@Component({
  selector: 'show-detail-form',
  templateUrl: './show-detail-form.component.html',
  styleUrls: ['./show-detail-form.component.sass'],
})
export class ShowDetailFormComponent implements OnInit {
  dataSource: MatTableDataSource<ShowDetails>;
  displayedColumns: string[] = [
    'network',
    'premiered',
    'language',
    'status',
    'ended',
    'type',
    'averageRuntime',
    'genres',
  ];

  displayDateLastWatched: boolean = false;

  deserializedData: any;
  showDetails: ShowDetails[] = [];

  showId: number;
  showDetailsForm: any;

  minDate: Date;
  maxDate: Date;

  isUpdate: boolean = false;
  errors: string[] = [];

  rating: number;
  ratings: number[] = [1, 2, 3, 4, 5];
  selectedRating: number;

  showSavedSuccessfully = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private showSummaryTableService: ShowSummaryTableService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.matIconRegistry.registerFontClassAlias('fas', 'fa');
    this.showDetailsForm = this.formBuilder.group({
      showId: [''],
      showName: [''],
      episodesWatched: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      dateLastWatched: [''],
      thoughts: [''],
      userRating: [''],
    });
    const storedData = localStorage.getItem('showDetails');
    if (storedData) {
      this.deserializedData = JSON.parse(storedData);
      this.showDetails = [this.deserializedData];
      this.dataSource = new MatTableDataSource<ShowDetails>(this.showDetails);
    }
    this.minDate = new Date(this.deserializedData.premiered);
    this.maxDate = new Date(); // Set the current date as the maximum date
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['showId'];
      this.isUpdate = +this.showId !== 0;
    });
    this.showDetailsForm.controls.episodesWatched.valueChanges.subscribe(
      (numberOfEpisodes: number) => {
        console.log(numberOfEpisodes, this.displayDateLastWatched);
        this.displayDateLastWatched = 0 < numberOfEpisodes;
      }
    );
    this.createShowDetailsForm();
  }

  createShowDetailsForm() {
    const isUpdate: boolean = +this.showId !== 0;
    if (isUpdate) {
      this.showSummaryTableService.select(this.showId).subscribe((shows) => {
        const show = shows[0];
        const updatedValues = {
          showId: this.showId,
          showName: show.showName,
          episodesWatched: show.episodesWatched,
          dateLastWatched: show.dateLastWatched,
          thoughts: show.thoughts,
          userRating: show.userRating,
        };
        this.selectedRating = show.userRating;
        this.showDetailsForm.patchValue(updatedValues);
        this.showSummaryTableService
          .searchShow(show.showName)
          .subscribe((data) => {
            this.deserializedData = data;
            this.showDetails = [data];
            this.dataSource = new MatTableDataSource<ShowDetails>(
              this.showDetails
            );
          });
      });
    }
  }

  getTextContent(html: any) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent;
  }

  formatGenres(genres: any) {
    return genres.toString().replaceAll(',', ', ');
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
    this.showDetailsForm.get('userRating').setValue(rating);
  }

  navigateToRoute() {
    this.router.navigate(['shows']);
  }

  onSubmit() {
    const show: Show = {
      showId: this.showDetailsForm.controls.showId.value,
      showName:
        this.showDetailsForm.controls.name?.value || this.deserializedData.name,
      episodesWatched: this.showDetailsForm.controls.episodesWatched.value,
      dateLastWatched: this.showDetailsForm.controls.dateLastWatched.value,
      thoughts: this.showDetailsForm.controls.thoughts.value,
      userRating: this.showDetailsForm.controls.userRating?.value || 0,
    };

    this.showSummaryTableService.save(show).subscribe({
      next: (data: any) => {
        console.log('in-next');
        this.showSavedSuccessfully = true;
        console.log('Show saved. Variable is true.');

        setTimeout(() => {
          this.showSavedSuccessfully = false;
          console.log('Timeout finished. Variable is now false.');
          this.cdr.detectChanges(); // Trigger change detection
        }, 10000);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.errors = error.error;
      },
    });
  }
}
