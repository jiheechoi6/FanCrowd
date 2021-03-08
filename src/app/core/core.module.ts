import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { OwlDateTimePickerModule } from './owl-datetime-picker/owl-datetime-picker.module';

@NgModule({
  declarations: [NavbarComponent, PageFooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    OwlDateTimePickerModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    PageFooterComponent,
    RouterModule,
    OwlDateTimePickerModule,
  ],
})
export class CoreModule {}
