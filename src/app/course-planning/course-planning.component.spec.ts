import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlanningComponent } from './course-planning.component';

describe('CoursePlanningComponent', () => {
  let component: CoursePlanningComponent;
  let fixture: ComponentFixture<CoursePlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePlanningComponent]
    });
    fixture = TestBed.createComponent(CoursePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
