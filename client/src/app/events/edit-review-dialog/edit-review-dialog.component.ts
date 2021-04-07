import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/event.service';
import ReviewDTO from 'src/app/shared/models/review-dto';

@Component({
  selector: 'app-edit-review-dialog',
  templateUrl: './edit-review-dialog.component.html',
  styleUrls: ['./edit-review-dialog.component.sass'],
})
export class EditReviewDialogComponent implements OnInit {
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<EditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { reviewId: string; review: ReviewDTO },
    private _eventService: EventService
  ) {}

  ngOnInit() {}

  onUpdateReview() {
    if (this.data.review) {
      this._eventService
        .updateReviewById(this.data.reviewId, this.data.review)
        .subscribe((review) => {
          this.dialogRef.close(review);
        });
    }
  }
}
