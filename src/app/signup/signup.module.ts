import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignupComponent,
      },
    ]),
  ],
})
export class SignupModule {}
