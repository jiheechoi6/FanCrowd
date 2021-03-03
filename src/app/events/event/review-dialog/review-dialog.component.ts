import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { FandomService } from '../../../core/services/fandom.service';
import Review from '../../../shared/models/review';

@Component({
  selector: 'add-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.sass'],
})
export class ReviewDialogComponent implements OnInit {
  newReview: Review;
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
  ) {
    const defaultPostDate = new Date();
    this.newReview = {
      id: 1000,
      title: '',
      rating: 0,
      content: '',
      postedBy: {
        username: 'user1',
        profileUrl: 'https://dummyimage.com/250',
        role: 'user'
      },
      postDate: defaultPostDate
    };
  }

  ngOnInit(): void {
  }

  addReview() {
    this.eventService.addReviewToEvent(this.data.id, this.newReview)
    this.dialogRef.close(this.newReview);
  }
}
