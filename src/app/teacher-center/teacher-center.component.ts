import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-teacher-center',
  templateUrl: './teacher-center.component.html',
  styleUrls: ['./teacher-center.component.css']
})
export class TeacherCenterComponent implements OnInit {
  courses: any[] = [];
  course: any = {};
  personalInfo: any = {};

  constructor(private teacherService: TeacherService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTeacherData();
  }

  loadTeacherData() {
    const teacherId = this.authService.getTeacherId();

    this.teacherService.getCoursesByTeacher(teacherId).subscribe(data => {
      this.courses = data.courses;
    });

    this.teacherService.getTeacherInfo(teacherId).subscribe(data => {
      this.personalInfo = data;
    });
  }

  createCourse(course: any) {
    this.teacherService.createCourse(course).subscribe(response => {
      // Gérer la logique après la création du cours
      this.loadTeacherData();
    });
  }

  closeCourse(courseId: number) {
    this.teacherService.closeCourse(courseId).subscribe(response => {
      // Gérer la logique après la fermeture du cours
      this.loadTeacherData();
    });
  }
}
