import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { SearchUserComponent } from './navbar/search-user/search-user.component';
import { OwlDateTimePickerModule } from './owl-datetime-picker/owl-datetime-picker.module';
import { SpacesToHyphenPipe } from './pipes/spaces-to-hyphen.pipe';
import { HyphenToSpacesPipe } from './pipes/hyphen-to-spaces.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    PageFooterComponent,
    SpacesToHyphenPipe,
    HyphenToSpacesPipe,
    SearchUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    OwlDateTimePickerModule,
    BreadcrumbModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    PageFooterComponent,
    RouterModule,
    OwlDateTimePickerModule,
    SpacesToHyphenPipe,
    HyphenToSpacesPipe,
    BreadcrumbModule,
  ],
})
export class CoreModule {}
