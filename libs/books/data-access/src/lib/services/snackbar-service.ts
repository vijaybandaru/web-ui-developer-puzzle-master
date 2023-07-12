import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from '../+state/reading-list.actions';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {

    action: string = "Undo";

    constructor(private snackBar: MatSnackBar, private readonly store: Store) { }

    openSnackBar(message: string, data: any) {
        const snackBarRef = this.snackBar.open(message, this.action, {
            duration: 3000,
        });

        snackBarRef.onAction().subscribe(() => {
            if(message === 'Added'){
                const item: ReadingListItem = {...data, bookId: data.id};
                this.store.dispatch(ReadingListActions.removeFromReadingList({ item, hideSnackbar: true }));
            } else if(message === 'Removed'){
                const book: Book = {...data, id: data.bookId};
                this.store.dispatch(ReadingListActions.addToReadingList({ book, hideSnackbar: true }));
            }
        })
    }

}