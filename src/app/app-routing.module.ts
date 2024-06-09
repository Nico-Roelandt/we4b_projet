import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentCenterComponent } from './student-center/student-center.component';
import { TeacherCenterComponent } from './teacher-center/teacher-center.component';
import { AuthGuard } from './auth.guard'; // Modifier le chemin

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'course/:courseCode', component: CourseDetailComponent },
  { path: 'student-center', component: StudentCenterComponent, canActivate: [AuthGuard] },
  { path: 'teacher-center', component: TeacherCenterComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
