import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getCoursesByStudent(studentId: number): Observable<any> {
    return this.http.get(`/api/students/${studentId}/courses`);
  }

  submitFeedback(courseId: number, feedback: string): Observable<any> {
    return this.http.post(`/api/courses/${courseId}/feedback`, { feedback });
  }
}
