import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';


export enum BooksActionTypes {
  SEARCH_BOOKS = "[Books Search Bar] Search",
  SEARCH_BOOKS_SUCCESS = "[Book Search API] Search success",
  SEARCH_BOOKS_FAIL = "[Book Search API] Search failure",
  CLEAR_SEARCH = "[Books Search Bar] Clear Search"
}

export const searchBooks = createAction(
  BooksActionTypes.SEARCH_BOOKS,
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  BooksActionTypes.SEARCH_BOOKS_SUCCESS,
  props<{ books: Book[] }>()
);

export const searchBooksFailure = createAction(
  BooksActionTypes.SEARCH_BOOKS_FAIL,
  props<{ error: any }>()
);

export const clearSearch = createAction(BooksActionTypes.CLEAR_SEARCH);
