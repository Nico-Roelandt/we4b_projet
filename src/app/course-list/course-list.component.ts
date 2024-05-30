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

  categories: string[] = ['All', 'Théorique', 'Pratique', 'Langues', 'Humanités'];
  branches: string[] = ['All', 'Informatique', 'Mécanique', 'Electrique', 'Design', 'Systéme industriel'];
  majors: string[] = ['All', 'Informatique : Monde virtuel', 'Informatique : IA'];
  locations: string[] = ['All', 'Sevenans', 'Belfort', 'Montbéliard'];

  constructor(private courseService: CourseService) {
    console.log('CourseListComponent constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.courses = this.courseService.getCourses();
    console.log('Courses loaded:', this.courses);
    this.filteredCourses = this.courses;
    console.log('Filtered courses initialized:', this.filteredCourses);
  }

  filterCourses() {
    console.log('Filtering courses');
    this.filteredCourses = this.courses.filter(course => {
      return (this.selectedCategory === 'All' || course.categories.includes(this.selectedCategory)) &&
             (this.selectedBranch === 'All' || course.branche === this.selectedBranch) &&
             (this.selectedMajor === 'All' || course.filiere === this.selectedMajor) &&
             (this.selectedLocation === 'All' || course.location === this.selectedLocation) &&
             (course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) || 
              course.teachers.some((teacher: string) => teacher.toLowerCase().includes(this.searchText.toLowerCase())));
    });
    console.log('Filtered courses:', this.filteredCourses);
  }
}
