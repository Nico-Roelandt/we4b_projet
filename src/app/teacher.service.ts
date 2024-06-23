import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addCourse`, course);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCourse/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCourse/${courseId}`);
  }

  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/branches`);
  }

  getMajors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/majors`);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/locations`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getCoursesByManager(courseManager: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coursesByManager?courseManager=${courseManager}`);
  }

  getCourseStudents(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courseStudents?courseId=${courseId}`);
  }

  getStudentEvaluation(courseId: number, studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/studentEvaluation?courseId=${courseId}&studentId=${studentId}`);
  }

  submitStudentEvaluation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitEvaluation`, data);
  }

  getStudentName(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/studentName?studentId=${studentId}`);
  }

}