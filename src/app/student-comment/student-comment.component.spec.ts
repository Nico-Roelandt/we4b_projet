import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommentComponent } from './student-comment.component';

describe('StudentCommentComponent', () => {
  let component: StudentCommentComponent;
  let fixture: ComponentFixture<StudentCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCommentComponent]
    });
    fixture = TestBed.createComponent(StudentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
