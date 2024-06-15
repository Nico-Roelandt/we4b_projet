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

  categories: any[] = [{ id: 'All', name: 'All' }];
  branches: any[] = [{ id: 'All', name: 'All' }];
  majors: any[] = [{ id: 'All', name: 'All' }];
  locations: any[] = [{ id: 'All', name: 'All' }];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = this.courses;
    });
    
    this.courseService.getCategories().subscribe(categories => {
      this.categories = [{ id: 'All', name: 'All' }, ...categories];
    });

    this.courseService.getBranches().subscribe(branches => {
      this.branches = [{ id: 'All', name: 'All' }, ...branches];
    });

    this.courseService.getMajors().subscribe(majors => {
      this.majors = [{ id: 'All', name: 'All' }, ...majors];
    });

    this.courseService.getLocations().subscribe(locations => {
      this.locations = [{ id: 'All', name: 'All' }, ...locations];
    });
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course => {
      return (this.selectedCategory === 'All' || course.categories.includes(this.selectedCategory)) &&
             (this.selectedBranch === 'All' || course.branch === this.selectedBranch) &&
             (this.selectedMajor === 'All' || course.major === this.selectedMajor) &&
             (this.selectedLocation === 'All' || course.location === this.selectedLocation) &&
             (course.courseName.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  getBranchName(branchId: number): string {
    const branch = this.branches.find(b => b.id === branchId);
    return branch ? branch.name : 'Unknown';
  }

  getLocationName(locationId: number): string {
    const location = this.locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown';
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  getMajorName(majorId: number): string {
    const major = this.majors.find(m => m.id === majorId);
    return major ? major.name : 'Unknown';
  }
}
