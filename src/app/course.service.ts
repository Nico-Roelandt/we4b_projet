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

  getReviewsByCourseCode(courseCode: string): Observable<any[]> {
    const url = `${this.apiUrl}/reviews?courseCode=${courseCode}`;
    return this.http.get<any[]>(url);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/locations`);
  }

  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branches`);
  }

  getMajors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/majors`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(courseCode: string, course: any): Observable<any> {
    const url = `${this.apiUrl}/courses/${courseCode}`;
    return this.http.put<any>(url, course);
  }

  deleteCourse(courseCode: string): Observable<any> {
    const url = `${this.apiUrl}/courses/${courseCode}`;
    return this.http.delete<any>(url);
  }
}
