import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

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
              const snackBarRef = this.snackBar.open('Added', 'Undo', {duration: 3000});
              snackBarRef.onAction().subscribe(() => {
                const item: ReadingListItem = {...book, bookId: book.id};
                this.store.dispatch(ReadingListActions.removeFromReadingList({ item, hideSnackbar: true }));
              })
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
              const snackBarRef = this.snackBar.open('Removed', 'Undo', {duration: 3000});
              snackBarRef.onAction().subscribe(() => {
                const book: Book = {...item, id: item.bookId};
                this.store.dispatch(ReadingListActions.addToReadingList({ book, hideSnackbar: true }));
              })
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
              private snackBar: MatSnackBar,
              private readonly store: Store) {}
}
