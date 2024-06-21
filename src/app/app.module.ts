import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseService } from './course.service';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentCenterComponent } from './student-center/student-center.component';
import { TeacherCenterComponent } from './teacher-center/teacher-center.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { StudentEvaluationComponent } from './student-evaluation/student-evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoursesComponent,
    CourseListComponent,
    CourseDetailComponent,
    LoginComponent,
    StudentCenterComponent,
    TeacherCenterComponent,
    StudentManagementComponent,
    StudentEvaluationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CourseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
