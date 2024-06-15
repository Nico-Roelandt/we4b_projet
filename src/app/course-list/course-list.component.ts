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
  selectedBranch: string = 'All';
  selectedMajor: string = 'All';
  selectedLocation: string = 'All';

  categories: string[] = ['All', 'Mathématiques', 'Informatique', 'Science'];
  branches: string[] = ['All', 'Sciences', 'Technologies', 'Lettres'];
  majors: string[] = ['All', 'Mathématiques', 'Informatique', 'Physique'];
  locations: string[] = ['All', 'Salle 101', 'Salle 202', 'Salle 303'];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = this.courses;
    });
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      return (this.selectedCategory === 'All' || course.categories.includes(this.selectedCategory)) &&
             (this.selectedBranch === 'All' || course.branch === this.selectedBranch) &&
             (this.selectedMajor === 'All' || course.major === this.selectedMajor) &&
             (this.selectedLocation === 'All' || course.location === this.selectedLocation) &&
             (course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) || 
              course.prof.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }
}
