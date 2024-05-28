import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  prof: string;
  categories: string[];
  courseName: string;
  courseCode: string;
  credits: number;

  constructor() {
    this.prof = 'Nom du professeur';
    this.categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];
    this.courseName = 'Nom du cours';
    this.courseCode = 'Code du cours';
    this.credits = 3;
  }
}
