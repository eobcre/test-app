import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPage } from './api-page';

describe('ApiPage', () => {
  let component: ApiPage;
  let fixture: ComponentFixture<ApiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
