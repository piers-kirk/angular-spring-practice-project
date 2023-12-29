import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpAndLoginComponent } from './sign-up-and-login/sign-up-and-login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'home', component: SignUpAndLoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
