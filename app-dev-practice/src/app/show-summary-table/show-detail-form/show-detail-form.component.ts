import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowSummaryTableService } from '../show-summary-table.service';

@Component({
  selector: 'show-detail-form',
  templateUrl: './show-detail-form.component.html',
  styleUrls: ['./show-detail-form.component.sass'],
})
export class ShowDetailFormComponent implements OnInit {
  showId: number;
  showDetailsForm: any;

  constructor(
    private showSummaryTableService: ShowSummaryTableService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.showDetailsForm = this.formBuilder.group({
      showId: [''],
      showName: ['', Validators.required],
      streamingPlatform: ['', Validators.required],
      genre: ['', Validators.required],
      rating: [''],
      directedBy: [''],
      starring: [''],
      runningTime: [''],
      reception: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['showId'];
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
          streamingPlatform: show.streamingPlatform,
          genre: show.genre,
          rating: show.rating != null ? show.rating : '',
          directedBy: show.directedBy != null ? show.directedBy : '',
          starring: show.starring != null ? show.starring : '',
          runningTime: show.runningTime != null ? show.runningTime : '',
          reception: show.reception != null ? show.reception : '',
        };
        this.showDetailsForm.patchValue(updatedValues);
      });
    } else {
    }
  }

  onSubmit() {
    this.showSummaryTableService
      .save(this.showDetailsForm.getRawValue())
      .subscribe({
        next: (data: any) => {},
        error: (err: any) => {
          console.log('addShow() failed: ', err);
        },
      });
  }
}
