import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSearch } from './db-search';

describe('DbSearch', () => {
  let component: DbSearch;
  let fixture: ComponentFixture<DbSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(DbSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
