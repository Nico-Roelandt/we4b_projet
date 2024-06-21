import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-teacher-center',
  templateUrl: './teacher-center.component.html',
  styleUrls: ['./teacher-center.component.css']
})
export class TeacherCenterComponent implements OnInit {
  courses: any[] = [];
  branches: any[] = [];
  majors: any[] = [];
  locations: any[] = [];
  teachers: string[] = ['Teacher A', 'Teacher B', 'Teacher C']; // Example teacher names
  categories: any[] = [];

  newCourse: any = {
    courseManager: this.authService.getUsername(),
    courseName: '',
    courseCode: '',
    branch_id: null,
    major_id: null,
    credits: null,
    seatLimit: null,
    studentsRegistered: 0,
    bibliography: '',
    location_id: null,
    program: '',
    teachers: [],
    categories: []
  };
  selectedCourse: any = null;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadDropdownData();
  }

  loadCourses(): void {
    const courseManager = this.authService.getUsername();
    this.teacherService.getCoursesByManager(courseManager).subscribe(courses => {
      this.courses = courses;
    });
  }

  loadDropdownData(): void {
    this.teacherService.getBranches().subscribe(branches => {
      this.branches = branches;
    });

    this.teacherService.getMajors().subscribe(majors => {
      this.majors = majors;
    });

    this.teacherService.getLocations().subscribe(locations => {
      this.locations = locations;
    });

    this.teacherService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  openCreateCourseModal(): void {
    const createCourseModal = new bootstrap.Modal(document.getElementById('createCourseModal')!);
    createCourseModal.show();
  }

  openEditCourseModal(course: any): void {
    this.selectedCourse = { ...course };
    const editCourseModal = new bootstrap.Modal(document.getElementById('editCourseModal')!);
    editCourseModal.show();
  }

  createCourse(): void {
    this.teacherService.addCourse(this.newCourse).subscribe(response => {
      this.showToast('Course created successfully.', 'success');
      this.loadCourses();
    }, error => {
      this.showToast('Error creating course.', 'error');
    });
  }

  updateCourse(): void {
    this.teacherService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(response => {
      this.showToast('Course updated successfully.', 'success');
      this.loadCourses();
    }, error => {
      this.showToast('Error updating course.', 'error');
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.teacherService.deleteCourse(courseId).subscribe(response => {
        this.showToast('Course deleted successfully.', 'success');
        this.loadCourses();
      }, error => {
        this.showToast('Error deleting course.', 'error');
      });
    }
  }

  viewStudentManagement(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      this.router.navigate(['/student-management', courseId, course.courseName]);
    }
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    const toastElement = document.getElementById('infoToast')!;
    const toastBody = toastElement.querySelector('.toast-body')!;

    toastBody.textContent = message;
    toastElement.className = `toast align-items-center text-white ${type === 'success' ? 'bg-success' : 'bg-danger'} border-0`;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
}
