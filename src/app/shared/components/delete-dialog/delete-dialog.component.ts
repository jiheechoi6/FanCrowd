import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  details: string;
  onConfirmCb: Function;
  params?: any[];
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    if (this.data.params?.length) {
      this.data.onConfirmCb(...this.data.params);
    } else {
      this.data.onConfirmCb();
    }

    this.dialogRef.close();
  }
}
