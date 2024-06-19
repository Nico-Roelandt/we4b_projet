import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    branch: '',
    major: '',
    credits: 0,
    seatLimit: 0,
    studentsRegistered: 0,
    bibliography: '',
    location: '',
    program: ''
  };
  personalInfo: any = {};

  constructor(private teacherService: TeacherService, private authService: AuthService, private router: Router) { }

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
    const courseToCreate = { 
      ...this.course, 
      teachers: this.course.teachers.split(','), 
      categories: this.course.categories.split(',').map(Number) 
    };
    this.teacherService.createCourse(courseToCreate).subscribe(response => {
      this.course = {
        courseManager: '',
        teachers: '',
        categories: '',
        courseName: '',
        courseCode: '',
        branch: '',
        major: '',
        credits: 0,
        seatLimit: 0,
        studentsRegistered: 0,
        bibliography: '',
        location: '',
        program: ''
      };
      this.loadTeacherData();
    });
  }

  editCourse(courseId: number) {
    this.router.navigate(['/edit-course', courseId]);
  }

  closeCourse(courseId: number) {
    this.teacherService.closeCourse(courseId).subscribe(response => {
      this.loadTeacherData();
    });
  }
}
