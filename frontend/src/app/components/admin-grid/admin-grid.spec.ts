import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrid } from './admin-grid';

describe('AdminGrid', () => {
  let component: AdminGrid;
  let fixture: ComponentFixture<AdminGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
