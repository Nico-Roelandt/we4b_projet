import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCoursesByStudent(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/studentCourses`, { params: { studentId: studentId.toString() } });
  }

  submitFeedback(courseId: number, feedback: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitFeedback`, { courseId, feedback });
  }

  unregisterCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unregisterCourse`, { studentId, courseId });
  }

  submitReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitReview`, reviewData);
  }
}
