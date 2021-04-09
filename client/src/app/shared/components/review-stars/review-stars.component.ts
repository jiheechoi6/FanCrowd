import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.sass'],
})
export class ReviewStarsComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() outOf: number = 0;

  constructor() {}

  ngOnInit() {}

  counter(i: number) {
    return new Array(Math.floor(i));
  }
}
