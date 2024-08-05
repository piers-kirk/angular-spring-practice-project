import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowSummaryTableService } from '../show-summary-table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { Show } from 'src/app/interfaces/show.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ShowDetails } from 'src/app/interfaces/showDetails.interface';
import { dateNotFutureValidator } from 'src/app/validators/date-not-future.validator';

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
  clientSaveTime: Date;

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
        [
          Validators.required,
          Validators.max(10000),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      dateLastWatched: [null, [dateNotFutureValidator()]],
      thoughts: [''],
      userRating: [''],
    });
    const storedData = localStorage.getItem('showDetails');
    if (storedData) {
      this.deserializedData = JSON.parse(storedData);
      this.showDetails = [this.deserializedData];
      this.dataSource = new MatTableDataSource<ShowDetails>(this.showDetails);
    }
    if (this.deserializedData.premiered) {
      const premiereDate = new Date(this.deserializedData.premiered);
      premiereDate.setDate(premiereDate.getDate() + 1);
      this.minDate = premiereDate;
    }
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['showId'];
      this.isUpdate = +this.showId !== 0;
    });
    this.showDetailsForm.controls.episodesWatched.valueChanges.subscribe(
      (numberOfEpisodes: number) => {
        this.displayDateLastWatched = 0 < numberOfEpisodes;
      }
    );
    this.createShowDetailsForm();
  }

  createShowDetailsForm() {
    this.isUpdate = +this.showId !== 0;
    if (this.isUpdate) {
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
            this.triggerValidation();
          });
      });
    }
  }

  triggerValidation(): void {
    Object.keys(this.showDetailsForm.controls).forEach((field) => {
      const control = this.showDetailsForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
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
    this.router.navigate(['']);
  }

  delete() {
    this.showSummaryTableService
      .delete(this.showDetailsForm.controls.showId.value)
      .subscribe({
        next: (data: any) => {
          this.navigateToRoute();
        },
        error: (error: HttpErrorResponse) => {
          this.errors = error.error;
        },
      });
  }

  save() {
    if (this.showDetailsForm.valid) {
      const show: Show = {
        showId: this.showDetailsForm.controls.showId.value,
        showName:
          this.showDetailsForm.controls.name?.value ||
          this.deserializedData.name,
        episodesWatched: this.showDetailsForm.controls.episodesWatched.value,
        dateLastWatched: this.showDetailsForm.controls.dateLastWatched.value,
        thoughts: this.showDetailsForm.controls.thoughts.value,
        userRating: this.showDetailsForm.controls.userRating?.value || 0,
      };
      this.showSummaryTableService.save(show).subscribe({
        next: () => {
          if (!this.isUpdate) {
            this.router.navigate(['']);
          } else {
            this.showSavedSuccessfully = true;
            this.clientSaveTime = new Date();
            setTimeout(() => {
              this.showSavedSuccessfully = false;
              this.cdr.detectChanges();
            }, 10000);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errors = error.error;
        },
      });
    }
  }
}
