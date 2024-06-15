import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  getCourseByCourseCode(courseCode: string): Observable<any> {
    const url = `${this.apiUrl}/courses/${courseCode}`;
    return this.http.get<any>(url);
  }

  getReviewsByCourseId(courseId: number): Observable<any[]> {
    const url = `${this.apiUrl}/reviews?courseId=${courseId}`;
    return this.http.get<any[]>(url);
  }
}
