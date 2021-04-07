import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { BioEditDialogComponent } from './bio-edit-dialog/bio-edit-dialog.component';

@NgModule({
  declarations: [UserComponent, EditUserDialogComponent, BioEditDialogComponent],
  imports: [CommonModule, UserRoutingModule, CoreModule, SharedModule],
})
export class UserModule {}
