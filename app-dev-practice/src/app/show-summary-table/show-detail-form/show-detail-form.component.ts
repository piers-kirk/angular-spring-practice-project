import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowSummaryTableService } from '../show-summary-table.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { Show } from 'src/app/interfaces/show.interface';
@Component({
  selector: 'show-detail-form',
  templateUrl: './show-detail-form.component.html',
  styleUrls: ['./show-detail-form.component.sass'],
})
export class ShowDetailFormComponent implements OnInit {
  showId: number;
  showDetailsForm: any;

  isUpdate: boolean = false;
  errors: string[] = [];

  rating: number;
  ratings: number[] = [1, 2, 3, 4, 5];
  selectedRating: number;

  constructor(
    private showSummaryTableService: ShowSummaryTableService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matIconRegistry: MatIconRegistry
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
      // below fields are set based on the data returned from the api
      id: [{ value: '', disabled: true }], // Unique identifier for the show.
      url: [{ value: '', disabled: true }], // URL of the show on TVmaze website.
      name: [{ value: '', disabled: true }], // Name of the show.
      type: [{ value: '', disabled: true }], // Type of the show (e.g., Scripted, Reality, Animation).
      language: [{ value: '', disabled: true }], // Language of the show.
      genres: [{ value: '', disabled: true }], // Array of genres associated with the show.
      status: [{ value: '', disabled: true }], // Status of the show (e.g., Running, Ended).
      runtime: [{ value: '', disabled: true }], // Duration of each episode in minutes.
      premiered: [{ value: '', disabled: true }], // Date when the show premiered.
      officialSite: [{ value: '', disabled: true }], // Official website of the show.
      schedule: [{ value: '', disabled: true }], // Object containing information about the show's airing schedule.
      rating: [{ value: '', disabled: true }], // Object containing information about the show's rating.
      weight: [{ value: '', disabled: true }], // Weight of the show (used for sorting in search results).
      network: [{ value: '', disabled: true }], // Object containing information about the show's network.
      webChannel: [{ value: '', disabled: true }], //Object containing information about the show's web channel.
      externals: [{ value: '', disabled: true }], // External IDs associated with the show (e.g., IMDb, TVmaze).
      image: [{ value: '', disabled: true }], // Object containing URLs of images associated with the show (e.g., poster, thumbnail).
      summary: [{ value: '', disabled: true }], // Summary or description of the show.
      updated: [{ value: '', disabled: true }], // Last time the show's data was updated.
    });
    const storedData = localStorage.getItem('showDetails');
    if (storedData) {
      const deserializedData = JSON.parse(storedData);
      this.showDetailsForm.patchValue(deserializedData);
      console.log(deserializedData);
      this.getTextContent();
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['showId'];
      this.isUpdate = +this.showId !== 0;
    });
    this.createShowDetailForm();
  }

  createShowDetailForm() {
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
            this.showDetailsForm.patchValue(data);
            this.getTextContent();
          });
      });
    }
  }

  getTextContent() {
    const htmlContent = this.showDetailsForm.controls.summary.value;
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    this.showDetailsForm.controls.summary.setValue(div.textContent);
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
    this.showDetailsForm.get('userRating').setValue(rating);
  }

  navigateToRoute() {
    this.router.navigate(['shows']);
  }

  onSubmit() {
    console.log(this.showDetailsForm);
    const show: Show = {
      showId: this.showDetailsForm.controls.showId.value,
      showName: this.showDetailsForm.controls.name.value,
      episodesWatched: this.showDetailsForm.controls.episodesWatched.value,
      dateLastWatched: this.showDetailsForm.controls.dateLastWatched.value,
      thoughts: this.showDetailsForm.controls.thoughts.value,
      userRating: this.showDetailsForm.controls.userRating.value,
    };
    this.showSummaryTableService.save(show).subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {
        this.errors = error.error;
      },
    });
  }
}
