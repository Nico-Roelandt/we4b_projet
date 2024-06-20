import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCourse`, course);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCourse/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCourse/${courseId}`);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses`);
  }
}
