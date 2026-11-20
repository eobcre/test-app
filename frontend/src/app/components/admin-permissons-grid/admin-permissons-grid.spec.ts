import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissonsGrid } from './admin-permissons-grid';

describe('AdminPermissonsGrid', () => {
  let component: AdminPermissonsGrid;
  let fixture: ComponentFixture<AdminPermissonsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPermissonsGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPermissonsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
