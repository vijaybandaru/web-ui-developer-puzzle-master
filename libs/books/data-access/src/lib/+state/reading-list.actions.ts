import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export enum ReadingListActionTypes {
  READING_LIST_INIT = "[Reading List] Initialize",
  LOAD_LIST_SUCCESS = "[Reading List API] Load list success",
  LOAD_LIST_FAIL = "[Reading List API] Load list error",
  ADD_TO_LIST = "[Books Search Results] Add to list",
  ADD_TO_LIST_SUCCESS = "[Reading List API] Confirmed add to list",
  ADD_TO_LIST_FAIL = "[Reading List API] Failed add to list",
  REMOVE_FROM_LIST = "[Books Search Results] Remove from list",
  REMOVE_FROM_LIST_SUCCESS = "[Reading List API] Confirmed remove from list",
  REMOVE_FROM_LIST_FAIL = "[Reading List API] Failed remove from list",
}

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  ReadingListActionTypes.LOAD_LIST_SUCCESS,
  props<{ list: ReadingListItem[] }>()
);

export const loadReadingListError = createAction(
  ReadingListActionTypes.LOAD_LIST_FAIL,
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  ReadingListActionTypes.ADD_TO_LIST,
  props<{ book: Book, hideSnackbar: boolean }>()
);

export const failedAddToReadingList = createAction(
  ReadingListActionTypes.ADD_TO_LIST_FAIL,
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  ReadingListActionTypes.ADD_TO_LIST_SUCCESS,
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  ReadingListActionTypes.REMOVE_FROM_LIST,
  props<{ item: ReadingListItem, hideSnackbar: boolean }>()
);

export const failedRemoveFromReadingList = createAction(
  ReadingListActionTypes.REMOVE_FROM_LIST_FAIL,
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  ReadingListActionTypes.REMOVE_FROM_LIST_SUCCESS,
  props<{ item: ReadingListItem }>()
);
