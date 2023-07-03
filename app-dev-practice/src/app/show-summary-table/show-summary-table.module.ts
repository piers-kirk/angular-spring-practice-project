import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';
import { ShowSummaryTableComponent } from './show-summary-table.component';
import { ShowSummaryTableRoutingModule } from './show-summary-table-routing.module';

@NgModule({
  declarations: [ShowSummaryTableComponent, ShowDetailFormComponent],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    RouterModule,
    ShowSummaryTableRoutingModule,
  ],
})
export class ShowModule {}
