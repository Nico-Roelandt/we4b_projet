import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentCenterComponent } from './student-center/student-center.component';
import { TeacherCenterComponent } from './teacher-center/teacher-center.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { StudentEvaluationComponent } from './student-evaluation/student-evaluation.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentCommentComponent } from './student-comment/student-comment.component';
import { CoursePlanningComponent } from './course-planning/course-planning.component';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:courseCode', component: CourseDetailComponent },
  { path: 'student-center', component: StudentCenterComponent },
  { path: 'teacher-center', component: TeacherCenterComponent },
  { path: 'student-management/:courseId/:courseName', component: StudentManagementComponent },
  { path: 'student-evaluation/:courseId/:studentId/:courseName', component: StudentEvaluationComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: '',component : HomePageComponent },
  { path: 'student-comment',component : StudentCommentComponent},
  { path: 'course-planning', component: CoursePlanningComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
