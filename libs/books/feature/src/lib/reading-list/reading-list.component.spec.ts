import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { of } from 'rxjs';

fdescribe('ReadingListComponent', () => {

  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  let store: MockStore;
  const initialState = {
    readingList: [
      {
        authors: ['David Herman'],
        bookId:'nBuA0hmspdMC',
        coverUrl: 'test',
        title: 'Effective JavaScript',
        publisher: 'Addison-Wesley',
        publishedDate:'2012-11-26T00:00:00.000Z',
        isAdded: false,
        description: 'test',
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          BooksFeatureModule, 
          SharedTestingModule,
        ],
      providers: [ provideMockStore({ }) ],
    }).compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    component.readingList$ = of(initialState.readingList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update book status as finished', () => {
    store = TestBed.inject(MockStore);
    const dispatchSpy = spyOn(store, 'dispatch');
    component.updateStatus(initialState);
    expect(dispatchSpy).toHaveBeenCalled();
  })

});
