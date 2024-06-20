import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentCenterComponent } from './student-center/student-center.component';
import { TeacherCenterComponent } from './teacher-center/teacher-center.component';


const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:courseCode', component: CourseDetailComponent },
  { path: 'student-center', component: StudentCenterComponent },
  { path: 'teacher-center', component: TeacherCenterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
