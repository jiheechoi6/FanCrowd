import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignupComponent,
      },
    ]),
  ],
  exports: [SignupComponent],
})
export class SignupModule {}
