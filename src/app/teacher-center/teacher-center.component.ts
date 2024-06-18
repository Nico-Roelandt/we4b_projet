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
  course: any = {
    courseManager: '',
    teachers: '',
    categories: '',
    courseName: '',
    courseCode: '',
    branch: 0,
    major: 0,
    credits: 0,
    seatLimit: 0,
    studentsRegistered: 0,
    bibliography: '',
    location: 0,
    program: ''
  };
  personalInfo: any = {};

  constructor(private teacherService: TeacherService, private authService: AuthService) { }

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

  createCourse() {
    const courseToCreate = { ...this.course, teachers: this.course.teachers.split(','), categories: this.course.categories.split(',').map(Number) };
    this.teacherService.createCourse(courseToCreate).subscribe(response => {
      this.course = {
        courseManager: '',
        teachers: '',
        categories: '',
        courseName: '',
        courseCode: '',
        branch: 0,
        major: 0,
        credits: 0,
        seatLimit: 0,
        studentsRegistered: 0,
        bibliography: '',
        location: 0,
        program: ''
      };
      this.loadTeacherData();
    });
  }

  closeCourse(courseId: number) {
    this.teacherService.closeCourse(courseId).subscribe(response => {
      this.loadTeacherData();
    });
  }
}
