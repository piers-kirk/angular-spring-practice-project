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
  existingShows: Show[];
  errors: string[] = [];
  showDetailsForm = this.formBuilder.group({
    showName: ['', Validators.required],
  });
  lockNext: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowInitialFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { existingShows: Show[] }
  ) {
    this.existingShows = data.existingShows;
  }

  showExists(input: string): boolean {
    return this.existingShows.some(
      (existingShow) =>
        existingShow.showName.trim().toLowerCase() ===
        input.trim().toLowerCase()
    );
  }

  resizeDialog(width: string, height: string): void {
    this.dialogRef.updateSize(width, height);
  }

  ngOnInit() {
    this.lockNext = true;
  }

  searchShow(showName: string) {
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(
      showName
    )}`;
    return this.http.get(url);
  }

  onShowNameChange(event: any) {
    const showName = event.target.value?.trim() || '';
    if (this.inputIsBlank(showName)) {
      this.searchShow(showName).subscribe({
        next: (response: any) => {
          if (!this.showIsDuplicated(showName)) {
            localStorage.setItem('showDetails', JSON.stringify(response));
            this.lockNext = false;
          } else {
            this.lockNext = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errors = ['An error occurred while searching for the show.'];
          this.lockNext = true;
        },
      });
    } else {
      this.lockNext = true;
    }
  }

  inputIsBlank(showName: string): boolean {
    if (!showName) {
      this.errors = ['Show Name cannot be blank.'];
      return false;
    } else {
      this.errors = [];
      return true;
    }
  }

  showIsDuplicated(showName: string): boolean {
    if (this.showExists(showName)) {
      this.errors = [
        'This show already exists. Please search for another show or update this show by selecting it from the table.',
      ];
      return true;
    } else {
      this.errors = [];
      return false;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onNextClick(): void {
    this.dialogRef.close('next');
  }
}
