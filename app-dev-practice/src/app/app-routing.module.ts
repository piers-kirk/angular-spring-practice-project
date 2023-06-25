import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ShowSummaryTableComponent } from './show-summary-table/show-summary-table.component';
import { ShowSummaryTableRoutingModule } from './show-summary-table/show-summary-table-routing.module';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'shows', component: ShowSummaryTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ShowSummaryTableRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
