import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getCoursesByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`/api/teachers/${teacherId}/courses`);
  }

  getTeacherInfo(teacherId: number): Observable<any> {
    return this.http.get(`/api/teachers/${teacherId}/info`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`/api/courses`, course);
  }

  closeCourse(courseId: number): Observable<any> {
    return this.http.delete(`/api/courses/${courseId}`);
  }
}
