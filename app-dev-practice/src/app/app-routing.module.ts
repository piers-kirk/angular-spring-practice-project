import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailFormComponent } from './show-detail-form/show-detail-form.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'show', component: ShowComponent },
  { path: 'show-detail-component/:id', component: ShowDetailFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
