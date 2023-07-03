import { Component } from '@angular/core';
import { ShowSummaryTableService } from './show-summary-table.service';
import { FormBuilder } from '@angular/forms';
import { Show } from '../interfaces/show.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'show-summary-table',
  templateUrl: './show-summary-table.component.html',
  styleUrls: ['./show-summary-table.component.sass'],
})
export class ShowSummaryTableComponent {
  constructor(
    private showSummaryTableService: ShowSummaryTableService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  shows: Show[];
  dataSource: MatTableDataSource<Show>;
  displayedColumns: string[] = [
    'select',
    'showName',
    'streamingPlatform',
    'genre',
  ];
  selection = new SelectionModel<Show>(true, []);

  ngOnInit() {
    this.getShows();
  }

  getShows(): void {
    this.showSummaryTableService.selectAll().subscribe((shows) => {
      this.shows = shows;
      this.dataSource = new MatTableDataSource(this.shows);
      this.dataSource.sort = this.sort;
    });
  }

  deleteShows() {
    const showIds = this.selection.selected.map((show) => show.showId);
    if (0 < showIds.length) {
      this.showSummaryTableService.delete(showIds).subscribe({
        next: (data: any) => {
          this.getShows();
        },
        error: (err: any) => {
          console.log('deleteShows() failed: ', err);
        },
      });
    }
  }

  exportShows() {
    this.showSummaryTableService.export().subscribe({
      next: (response: Blob) => {
        const blobURL = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = 'shows.xlsx'; // Specify the desired filename
        a.target = '_blank';
        a.click();
      },
      error: (err: any) => {
        console.log('exportShows() failed: ', err);
      },
    });
  }

  navigateToRoute() {
    this.router.navigate(['menu']);
  }

  navigateToShowDetailForm(showId: any) {
    this.router.navigate(['shows/showDetail/', showId]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}