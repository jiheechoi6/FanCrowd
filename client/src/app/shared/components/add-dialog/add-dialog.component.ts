import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { FandomService } from 'src/app/core/services/fandom.service';
import Category from '../../models/category';
import Fandom from '../../models/fandom';

interface DialogData {
  title: string;
  categoryId?: string;
  isCategory: boolean;
  isEditing: boolean;
  category?: Category;
  fandom?: Fandom;
}

interface AddDialogData {
  name: string;
  backgroundURL: string;
  category?: string;
  _id?: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class AddDialogComponent implements OnInit {
  entity: AddDialogData;
  errorMsg: string | null = null;
  isLoading = false;

  constructor(
    private _fandomService: FandomService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.isEditing && data.isCategory) {
      this.entity = {
        name: this.data.category!.name,
        _id: this.data.category!._id,
        backgroundURL: this.data.category!.backgroundURL,
      };
    } else if (data.isEditing && !data.isCategory) {
      this.entity = {
        name: this.data.fandom!.name,
        category: this.data.fandom!.category,
        backgroundURL: this.data.fandom!.backgroundURL,
        _id: this.data.fandom!._id,
      };
    } else {
      this.entity = {
        name: '',
        category: this.data.categoryId,
        backgroundURL: '',
      };
    }
  }

  ngOnInit() {}

  onConfirm() {
    if (this.data.isCategory && !this.data.isEditing) {
      this.addCategory(this.entity as Category);
    } else if (!this.data.isCategory && !this.data.isEditing) {
      this.addFandom(this.entity as Fandom);
    } else if (this.data.isCategory && this.data.isEditing) {
      this.updateCategory(this.entity as Category);
    } else if (!this.data.isCategory && this.data.isEditing) {
      this.updateFandom(this.entity as Fandom);
    }
  }

  addCategory(newCategory: Category) {
    this.isLoading = true;
    this._fandomService
      .addCategory(newCategory)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (category) => this.dialogRef.close(category),
        (err) => (this.errorMsg = err.error.message)
      );
  }

  addFandom(newFandom: Fandom) {
    this.isLoading = true;
    this._fandomService
      .addFandom(newFandom)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (fandom) => this.dialogRef.close(fandom),
        (err) => (this.errorMsg = err.error.message)
      );
  }

  updateCategory(updatedCategory: Category) {
    this.isLoading = true;
    this._fandomService
      .updateCategoryById(updatedCategory._id, updatedCategory)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => this.dialogRef.close(updatedCategory),
        (err) => (this.errorMsg = err.error.message)
      );
  }

  updateFandom(updatedFandom: Fandom) {
    this.isLoading = true;
    this._fandomService
      .updateFandomById(updatedFandom._id, updatedFandom)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => this.dialogRef.close(updatedFandom),
        (err) => (this.errorMsg = err.error.message)
      );
  }
}
