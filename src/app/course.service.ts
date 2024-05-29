import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() { }

  getCourses() {
    return [
      {
        manager_course: 'Responsable A',
        teachers: ['Professeur A'],
        categories: ['Mathématiques', 'Science'],
        courseName: 'Calculus',
        courseCode: 'MATH101',
        branche: 'Branche A',
        filiere: 'Filiere 1',
        credits: 3,
        seat: 30,
        students_registered: 25,
        bibliography: 'Book 1',
        location: 'Location 1'
      },
      {
        manager_course: 'Responsable B',
        teachers: ['Professeur B'],
        categories: ['Informatique'],
        courseName: 'Algorithms',
        courseCode: 'CS201',
        branche: 'Branche B',
        filiere: 'Filiere 2',
        credits: 4,
        seat: 40,
        students_registered: 35,
        bibliography: 'Book 2',
        location: 'Location 2'
      }
    ];
  }
}
