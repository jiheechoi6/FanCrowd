import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, 
    RouterModule, 
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
