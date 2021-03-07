import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { SearchUserComponent } from './navbar/search-user/search-user.component';

@NgModule({
  declarations: [NavbarComponent, PageFooterComponent, SearchUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    PageFooterComponent,
  ],
})
export class CoreModule {}
