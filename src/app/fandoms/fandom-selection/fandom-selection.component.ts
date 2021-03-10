import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FandomService } from '../../core/services/fandom.service';
import Fandom from 'src/app/shared/models/fandom';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-fandom-selection',
  templateUrl: './fandom-selection.component.html',
  styleUrls: ['./fandom-selection.component.sass'],
})
export class FandomSelectionComponent implements OnInit {
  category: string = '';
  fandoms: Fandom[] = [];

  constructor(
    private _fandomService: FandomService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.category = params['category'];
    });
  }

  ngOnInit(): void {
    this.fandoms = this._fandomService.getFandomsByCategories(this.category);
  }

  openCreateFandomDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        title: 'Fandom in ' + this.category,
        categoryName: this.category,
        isCategory: false,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fandoms = this._fandomService.getFandomsByCategories(this.category);
    });
  }
}
