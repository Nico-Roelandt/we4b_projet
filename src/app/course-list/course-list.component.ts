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
    this.loadFilters().then(() => {
      this.loadCourses();
    });
  }

  // Récupérer les cours
  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses.map(course => ({
        ...course,
        branchName: this.getBranchName(course.branch_id),
        majorName: this.getMajorName(course.major_id),
        locationName: this.getLocationName(course.location_id),
        categories: course.categoryNames ? course.categoryNames.split(',') : []
      }));
      this.filteredCourses = [...this.courses];
      console.log('Courses:', this.courses);
    });
  }




  loadFilters(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.courseService.getCategories().subscribe(categories => {
        this.categories = [{ id: 'All', name: 'All' }, ...categories];
        this.courseService.getBranches().subscribe(branches => {
          this.branches = [{ id: 'All', name: 'All' }, ...branches];
          this.courseService.getMajors().subscribe(majors => {
            this.majors = [{ id: 'All', name: 'All' }, ...majors];
            this.courseService.getLocations().subscribe(locations => {
              this.locations = [{ id: 'All', name: 'All' }, ...locations];
              resolve();
            });
          });
        });
      });
    });
  }



  getBranchName(branchId: number): string {
    const branch = this.branches.find(branch => branch.id === branchId);
    return branch ? branch.name : 'Unknown';
  }

  getMajorName(majorId: number): string {
    const major = this.majors.find(major => major.id === majorId);
    return major ? major.name : 'Unknown';
  }

  getLocationName(locationId: number): string {
    const location = this.locations.find(location => location.id === locationId);
    return location ? location.name : 'Unknown';
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const categoryMatch = this.selectedCategory === 'All' || course.categories.includes(this.getCategoryNameById(parseInt(this.selectedCategory)));
      const branchMatch = this.selectedBranch === 'All' || course.branchName === this.getBranchName(parseInt(this.selectedBranch));
      const majorMatch = this.selectedMajor === 'All' || course.majorName === this.getMajorName(parseInt(this.selectedMajor));
      const locationMatch = this.selectedLocation === 'All' || course.locationName === this.getLocationName(parseInt(this.selectedLocation));
      const searchMatch = course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) || course.courseCode.toLowerCase().includes(this.searchText.toLowerCase());

      return categoryMatch && branchMatch && majorMatch && locationMatch && searchMatch;
    });
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find(category => category.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}
