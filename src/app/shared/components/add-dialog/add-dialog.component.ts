import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Category from '../../models/category';
import Fandom from '../../models/fandom';

interface DialogData {
  title: string;
  categoryName: string;
  isCategory : any;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class AddDialogComponent implements OnInit {
    newCategory: Category = {
        id: 1000,
        name: '',
        backgroundUrl: ''
    };
    newFandom: Fandom = {
        id: 1000,
        name: '',
        category: '',
        backgroundUrl: ''
    };
    object: any;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.object = {
        id: 1000,
        name: '',
        category: this.data.categoryName,
        backgroundUrl: ''
    }
  }

  onConfirm() {
    if (this.data.isCategory){
        // Add a Category
        this.newCategory.name = this.object.name;
        this.newCategory.backgroundUrl = this.object.backgroundUrl;

        this.addCategory(this.newCategory);
    } else {
        // Add a Fandom
        this.newFandom.name = this.object.name;
        this.newFandom.category = this.object.category;
        this.newFandom.backgroundUrl = this.object.backgroundUrl;

        this.addFandom(this.newFandom);
    }
    
    this.dialogRef.close();
  }

  addCategory(newCategory: Category): void {
    // Call fandomService and add caategory
    console.log("Category Added", newCategory);
  }

  addFandom(newFandom: Fandom): void {
    // Call fandomService and add caategory
    console.log("Fandom Added", newFandom);
  }
}
