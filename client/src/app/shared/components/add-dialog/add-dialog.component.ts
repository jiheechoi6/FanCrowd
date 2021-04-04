import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FandomService } from 'src/app/core/services/fandom.service';
import Category from '../../models/category';
import Fandom from '../../models/fandom';

interface DialogData {
  title: string;
  categoryId?: string;
  isCategory: boolean;
}

interface AddDialogData {
  name: string;
  backgroundURL: string;
  category?: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class AddDialogComponent implements OnInit {
  newEntity: AddDialogData;
  errorMsg: string | null = null;

  constructor(
    private _fandomService: FandomService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.newEntity = {
      name: '',
      category: this.data.categoryId,
      backgroundURL: '',
    };
  }

  ngOnInit() {}

  onConfirm() {
    if (this.data.isCategory) {
      this.addCategory(this.newEntity as Category);
    } else {
      this.newEntity.category = this.data.categoryId!;
      this.addFandom(this.newEntity as Fandom);
    }
  }

  addCategory(newCategory: Category) {
    this._fandomService.addCategory(newCategory).subscribe(
      (category) => this.dialogRef.close(category),
      (err) => (this.errorMsg = err.error.message)
    );
  }

  addFandom(newFandom: Fandom) {
    this._fandomService.addFandom(newFandom);
  }
}
