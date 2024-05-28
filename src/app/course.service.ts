import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() { }

  getCourses() {
    return [
      {
        prof: 'Professeur A',
        categories: ['Mathématiques', 'Science'],
        courseName: 'Calculus',
        courseCode: 'MATH101',
        credits: 3
      },
      {
        prof: 'Professeur B',
        categories: ['Informatique'],
        courseName: 'Algorithms',
        courseCode: 'CS201',
        credits: 4
      }
    ];
  }
}
