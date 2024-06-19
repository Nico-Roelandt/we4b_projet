import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCoursesByTeacher(teacherId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teachers/${teacherId}/courses`);
  }

  getTeacherInfo(teacherId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teachers/${teacherId}/info`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, course);
  }

  closeCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${courseId}`);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/courses/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${courseId}`);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}`);
  }

}