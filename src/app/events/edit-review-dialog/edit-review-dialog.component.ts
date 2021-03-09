import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';
import Review from 'src/app/shared/models/review';

@Component({
  selector: 'app-edit-review-dialog',
  templateUrl: './edit-review-dialog.component.html',
  styleUrls: ['./edit-review-dialog.component.sass'],
})
export class EditReviewDialogComponent implements OnInit {
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<EditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eventId: number, review: any},
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {}

  onUpdateReview() {
    if (this.data.review){
      this.eventService.updateReviewById(this.data.eventId, this.data.review);
      this.dialogRef.close(this.data.review);
    }
  }
}
