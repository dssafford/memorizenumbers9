import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject} from 'rxjs';
import {FAMILYROOM25_LIST_DATA} from '../data/familyroom25';

@Component({
  selector: 'app-familyroom25',
  templateUrl: './familyroom25.component.html',
  styleUrls: ['./familyroom25.component.css']
})
export class Familyroom25Component implements OnInit, AfterViewInit {
  displayedColumns = ['number', 'name'];

  private loadingSubject = new BehaviorSubject<boolean>(false);

  // public loading$ = this.loadingSubject.asObservable();
  public loading = false;

  dataSource = new MatTableDataSource<MYNUMBER>();

  constructor() {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {

    this.loading = true;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, 1000);
  }

  applyFilter(filterValue: string) {

    this.loading = true;

    setTimeout(() => {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
      this.loading = false;
    }, 500);


  }
  rowClicked(row: any): void {
    console.log(row);
  }
  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = FAMILYROOM25_LIST_DATA;
      this.loading = false;
    }, 1000);
  }
}
export interface MYNUMBER {
  number: number;
  name: string;
}


