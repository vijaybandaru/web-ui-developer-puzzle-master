import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../services/snackbar-service';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book, hideSnackbar }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => {
            if(!hideSnackbar){
              this.snackBar.openSnackBar('Added', book);
            }
            return ReadingListActions.confirmedAddToReadingList({ book });
          }),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item, hideSnackbar }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() => {
            if(!hideSnackbar){
              this.snackBar.openSnackBar('Removed', item);
            }
            return ReadingListActions.confirmedRemoveFromReadingList({ item });
          }),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, 
              private http: HttpClient, 
              private snackBar: SnackbarService,
              private readonly store: Store) {}
}
