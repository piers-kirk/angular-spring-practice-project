import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from './menu/menu.module';
import { AppComponent } from './app.component';
import { SignUpAndLoginComponent } from './sign-up-and-login/sign-up-and-login.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [AppComponent, SignUpAndLoginComponent, SettingsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    MenuModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
