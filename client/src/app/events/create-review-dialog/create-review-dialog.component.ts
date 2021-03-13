import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import PartialUserDTO from 'src/app/shared/models/partial-user-dto';
import { EventService } from '../../core/services/event.service';
import Review from '../../shared/models/review';

@Component({
  selector: 'add-review-dialog',
  templateUrl: './create-review-dialog.component.html',
  styleUrls: ['./create-review-dialog.component.sass'],
})
export class ReviewDialogComponent implements OnInit {
  newReview: Review;
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; user: PartialUserDTO },
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {
    const defaultPostDate = new Date();
    this.newReview = {
      id: 1000,
      title: '',
      rating: 0,
      content: '',
      postedBy: {
        username: this.data.user.username,
        profileUrl: this.data.user.profileUrl,
        role: this.data.user.role,
      },
      postDate: defaultPostDate,
    };
  }

  ngOnInit(): void {}

  addReview() {
    this.newReview.postDate = new Date();
    this.eventService.addReviewToEvent(this.data.id, this.newReview);
    this.dialogRef.close(this.newReview);
  }
}
