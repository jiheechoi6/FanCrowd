import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CoreModule } from '../core/core.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [SpinnerComponent, DeleteDialogComponent],
  imports: [CommonModule, CoreModule],
  exports: [SpinnerComponent, DeleteDialogComponent],
})
export class SharedModule {}
