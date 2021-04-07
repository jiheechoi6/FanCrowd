import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass'],
})
export class SpinnerComponent implements OnInit {
  @Input() diameter: number = 50;

  constructor() {}

  ngOnInit() {}
}
