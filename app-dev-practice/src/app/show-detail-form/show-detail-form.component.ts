import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-detail-form',
  templateUrl: './show-detail-form.component.html',
  styleUrls: ['./show-detail-form.component.sass'],
})
export class ShowDetailFormComponent implements OnInit {
  showId: number;
  showDetailsForm: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.showId = params['id'];
    });

    this.showDetailsForm = this.formBuilder.group({
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

  onSubmit() {
    console.log(this.showDetailsForm);
  }
}
