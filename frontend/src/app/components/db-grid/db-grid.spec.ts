import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbGrid } from './db-grid';

describe('DbGrid', () => {
  let component: DbGrid;
  let fixture: ComponentFixture<DbGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(DbGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
