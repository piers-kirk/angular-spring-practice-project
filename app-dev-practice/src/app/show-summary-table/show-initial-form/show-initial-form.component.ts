import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Show } from 'src/app/interfaces/show.interface';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-initial-form',
  templateUrl: './show-initial-form.component.html',
  styleUrls: ['./show-initial-form.component.sass'],
})
export class ShowInitialFormComponent {
  errors: string[] = [];
  showDetailsForm: any;
  lockNext: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowInitialFormComponent>,
    @Inject(MAT_DIALOG_DATA) public existingShows: Show[]
  ) {
    this.showDetailsForm = this.formBuilder.group({
      showName: [''],
    });
  }

  ngOnInit() {
    this.onShowNameChange();
  }

  searchShow(showName: string) {
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(
      showName
    )}`;
    return this.http.get(url);
  }

  onShowNameChange() {
    this.showDetailsForm.get('showName').valueChanges.subscribe({
      next: (showName: any) => {
        this.searchShow(showName).subscribe({
          next: (response: any) => {
            let showAlreadyExists = false;
            showAlreadyExists =
              Array.isArray(this.existingShows) &&
              this.existingShows.some(
                (existingShow) => existingShow.showName === response['showName']
              );
            if (!showAlreadyExists) {
              localStorage.setItem('showDetails', JSON.stringify(response));
              this.lockNext = false;
            }
          },
          error: (error: HttpErrorResponse) => {
            this.errors = error.error;
            this.lockNext = true;
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errors = error.error;
        this.lockNext = true;
      },
    });
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onNextClick(): void {
    this.dialogRef.close('next');
  }
}
