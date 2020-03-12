import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject} from 'rxjs';
import {LORAYNE_LEARNING_DATA} from '../data/lorayneNumbers';

@Component({
  selector: 'app-lorayne-list',
  templateUrl: './lorayne-list.component.html',
  styleUrls: ['./lorayne-list.component.css']
})
export class LorayneListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['number', 'name'];

  private loadingSubject = new BehaviorSubject<boolean>(false);

  // public loading$ = this.loadingSubject.asObservable();
  public loading = false;

  dataSource = new MatTableDataSource();
  // mynumbers: LORAYNE_LEARNING_DATA[];
  constructor(){}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
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
      this.dataSource.data = LORAYNE_LEARNING_DATA;
      this.loading = false;
    }, 1000);
  }
}

export interface MYNUMBER {
  number: number;
  name: string;
}
