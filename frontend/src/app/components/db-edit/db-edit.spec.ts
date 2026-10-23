import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbEdit } from './db-edit';

describe('DbEdit', () => {
  let component: DbEdit;
  let fixture: ComponentFixture<DbEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(DbEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
