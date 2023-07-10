import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';
import { ShowSummaryTableComponent } from './show-summary-table.component';
import { ShowInitialFormComponent } from './show-initial-form/show-initial-form.component';
import { ShowSummaryTableRoutingModule } from './show-summary-table-routing.module';

@NgModule({
  declarations: [
    ShowSummaryTableComponent,
    ShowInitialFormComponent,
    ShowDetailFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    RouterModule,
    ShowSummaryTableRoutingModule,
  ],
})
export class ShowModule {}
