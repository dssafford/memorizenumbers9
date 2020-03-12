import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, merge, of as observableOf, fromEvent} from 'rxjs';
import {catchError, map, startWith, switchMap, tap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Quiz} from '../model/quiz';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-quiz-list',
  styleUrls: ['quiz-list.component.css'],
  templateUrl: 'quiz-list.component.html',
})
export class QuizListComponent implements AfterViewInit {
  // displayedColumns = ['created', 'state', 'number', 'title'];
  displayedColumns = ['id', 'numberOfQuestions', 'score', 'comments'];

  // exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('douginput', { static: true }) input: ElementRef;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit() {
    // this.exampleDatabase = new ExampleHttpDao(this.http);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoadingResults = true;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup ')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.applyFilter(this.input.nativeElement.valueOf());
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getData();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 5; //data.results.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  getData(): Observable<Quiz[]> {
    // const apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    return this.http.get<Quiz[]>('http://localhost:8004/api/QuizList')
      .pipe(map((data: any) => data as Quiz[]));

  }
  rowClicked(row: any): void {
    console.log(row);
  }
  getQuizListData(sort: string, order: string, page: number): Observable<Quiz> {
    const href = 'http://localhost:8004/api/QuizList';
    // console.log(this.http.get<Quiz>(href).toPromise());
    return this.http.get<Quiz>(href);
  }
  quizListData(): Observable<Quiz> {
    const href = 'http://localhost:8004/api/QuizList';
    // console.log(this.http.get<Quiz>(href).toPromise());
    return this.http.get<Quiz>(href);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
