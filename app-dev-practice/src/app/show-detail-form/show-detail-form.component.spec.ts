import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailFormComponent } from './show-detail-form.component';

describe('ShowDetailFormComponent', () => {
  let component: ShowDetailFormComponent;
  let fixture: ComponentFixture<ShowDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailFormComponent]
    });
    fixture = TestBed.createComponent(ShowDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
