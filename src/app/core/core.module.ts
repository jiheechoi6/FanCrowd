import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, NavbarComponent, MatPaginatorModule],
})
export class CoreModule {}
