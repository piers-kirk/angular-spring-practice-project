import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSummaryTableComponent } from '../show-summary-table/show-summary-table.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'shows', component: ShowSummaryTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
