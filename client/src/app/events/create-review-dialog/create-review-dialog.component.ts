import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';
import ReviewDTO from 'src/app/shared/models/review-dto';

@Component({
  selector: 'add-review-dialog',
  templateUrl: './create-review-dialog.component.html',
  styleUrls: ['./create-review-dialog.component.sass'],
})
export class ReviewDialogComponent implements OnInit {
  newReview: ReviewDTO;
  ratings: number[] = [1, 2, 3, 4, 5];

  isCreating = false;
  errorMsg: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private eventService: EventService
  ) {
    this.newReview = {
      title: '',
      rating: 0,
      content: '',
      event: this.data.eventId,
    };
  }

  ngOnInit() {}

  addReview() {
    this.isCreating = true;
    this.eventService
      .addReviewToEvent(this.data.eventId, this.newReview)
      .pipe(finalize(() => (this.isCreating = false)))
      .subscribe(
        (newReview) => this.dialogRef.close(newReview),
        (err) => (this.errorMsg = err.error.message)
      );
  }
}
