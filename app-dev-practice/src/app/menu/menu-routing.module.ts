import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSummaryTableComponent } from '../show-summary-table/show-summary-table.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'shows', component: ShowSummaryTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
