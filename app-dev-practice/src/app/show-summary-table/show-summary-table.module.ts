import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';
import { ShowSummaryTableComponent } from './show-summary-table.component';

@NgModule({
  declarations: [ShowSummaryTableComponent, ShowDetailFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class ShowModule {}
