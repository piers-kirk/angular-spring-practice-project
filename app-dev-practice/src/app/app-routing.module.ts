import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowSummaryTableComponent } from './show-summary-table/show-summary-table.component';

const routes: Routes = [{ path: '', component: ShowSummaryTableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
