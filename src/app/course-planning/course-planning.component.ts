import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../course.service';

@Component({
  selector: 'app-course-planning',
  templateUrl: './course-planning.component.html',
  styleUrls: ['./course-planning.component.css']
})
export class CoursePlanningComponent implements OnInit {
  semesters = ['Semestre 1', 'Semestre 2', 'Semestre 3'];
  selectedSemester = 'Semestre 1';
  timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00'];
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  filterCourses(): void {
    // 这里可以根据学期进行筛选
  }

  getCourseAt(time: string, day: string): string {
    const course = this.courses.find(c => c.time === time && c.day === day);
    return course ? course.name : '';
  }
}
