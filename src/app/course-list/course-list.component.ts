import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  searchText: string = '';
  selectedCategory: string = 'All';

  categories: string[] = ['All', 'Mathématiques', 'Informatique', 'Science'];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.filteredCourses = this.courses;
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      return (this.selectedCategory === 'All' || course.categories.includes(this.selectedCategory)) &&
             (course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) || 
              course.prof.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }
}
