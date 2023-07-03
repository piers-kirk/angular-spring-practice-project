import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ShowModule } from '../show-summary-table/show-summary-table.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MenuRoutingModule,
    ShowModule,
  ],
})
export class MenuModule {}
