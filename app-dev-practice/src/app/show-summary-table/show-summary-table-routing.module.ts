import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';
import { ShowSummaryTableComponent } from './show-summary-table.component';

const routes: Routes = [
  { path: 'shows/showDetail/:showId', component: ShowDetailFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowSummaryTableRoutingModule {}
