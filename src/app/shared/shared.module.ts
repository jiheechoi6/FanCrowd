import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, CoreModule],
  exports: [SpinnerComponent],
})
export class SharedModule {}
