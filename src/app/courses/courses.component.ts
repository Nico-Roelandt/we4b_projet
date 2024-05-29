import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  manager_course: string;
  teachers: string[];
  categories: string[];
  courseName: string;
  courseCode: string;
  branche: string;
  filiere: string;
  credits: number;
  seat: number;
  students_registered: number;
  bibliography: string;
  location: string;

  constructor() {
    this.manager_course = 'Nom du responsable';
    this.teachers = ['Undefined'];
    this.categories = ['Undefined'];
    this.courseName = 'Undefined';
    this.courseCode = 'Undefined';
    this.credits = 3;
    this.branche = 'Undefined';
    this.filiere = 'Undefined';
    this.seat = 30;
    this.students_registered = 0;
    this.bibliography = 'Undefined';
    this.location = 'Undefined';
  }
}
