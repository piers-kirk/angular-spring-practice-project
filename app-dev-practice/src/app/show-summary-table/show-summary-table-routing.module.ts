import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSummaryTableComponent } from './show-summary-table.component';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';

const routes: Routes = [
  { path: '', component: ShowSummaryTableComponent },
  { path: 'shows/showDetail/:showId', component: ShowDetailFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowSummaryTableRoutingModule {}
