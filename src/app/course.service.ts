import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  courseManager: string;
  courseName: string;
  courseCode: string;
  branch_id: number;
  major_id: number;
  credits: number;
  seatLimit: number;
  studentsRegistered: number;
  bibliography: string;
  location_id: number;
  program: string;
  time: string; // 新增属性
  day: string;  // 新增属性
  name: string;
}

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
    const url = `${this.apiUrl}/courseByCode?courseCode=${courseCode}`;
    return this.http.get<any>(url);
  }

  getCourseIdByCourseCode(courseCode: string): Observable<number> {
    const url = `${this.apiUrl}/courseIdByCode?courseCode=${courseCode}`;
    return this.http.get<number>(url);
  }

  getReviewsByCourseCode(courseCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews?courseCode=${courseCode}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getCategoriesByCourseId(courseId: number): Observable<any[]> {
    const url = `${this.apiUrl}/categoriesByCourseId?courseId=${courseId}`;
    return this.http.get<any[]>(url);
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

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/courses/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${courseId}`);
  }

  registerStudentForCourse(studentId: number, courseId: number, courseCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { studentId, courseId, courseCode });
  }
  
  // 新增方法：获取特定学生注册的课程
  getCoursesByStudentId(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/studentCourses?studentId=${studentId}`);
  }

  getCourseRegistrationStatus(studentId: number, courseId: number): Observable<{ registered: boolean }> {
    return this.http.get<{ registered: boolean }>(`${this.apiUrl}/isCourseRegistered?studentId=${studentId}&courseId=${courseId}`);
  }
}



