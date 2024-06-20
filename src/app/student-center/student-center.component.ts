import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import * as bootstrap from 'bootstrap'; // Ajout de l'importation de Bootstrap

@Component({
  selector: 'app-student-center',
  templateUrl: './student-center.component.html',
  styleUrls: ['./student-center.component.css']
})
export class StudentCenterComponent implements OnInit {
  courses: any[] = [];
  credits: number = 0;
  assessments: any[] = [];
  feedback: any[] = [];
  newReview: any = {
    courseId: 0,
    studentId: 0,
    theory: 0,
    practice: 0,
    subject: 0,
    personalAppreciation: 0,
    comment: ''
  };

  constructor(private studentService: StudentService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    const studentId = this.authService.getStudentId();
    
    this.studentService.getCoursesByStudent(studentId).subscribe(data => {
      this.courses = data.courses;
      this.credits = data.credits;
      this.assessments = data.assessments;
    });
  }

  submitFeedback(courseId: number, feedback: string) {
    this.studentService.submitFeedback(courseId, feedback).subscribe(response => {
      // Logique de traitement après la soumission des commentaires
    });
  }

  viewCourseDetails(coursecode: string) {
    this.router.navigate(['/courses/', coursecode]);
  }

  addCourseReviews(courseId: number) {
    this.newReview.courseId = courseId;
    this.newReview.studentId = this.authService.getStudentId();
    const reviewModalElement = document.getElementById('reviewModal');
    if (reviewModalElement) {
      const reviewModal = new bootstrap.Modal(reviewModalElement);
      reviewModal.show();
    }
  }

  submitReview() {
    this.studentService.submitReview(this.newReview).subscribe(response => {
      this.showToast('Review submitted successfully.', 'info');
      this.newReview = {
        courseId: 0,
        studentId: 0,
        theory: 0,
        practice: 0,
        subject: 0,
        personalAppreciation: 0,
        comment: ''
      };
      const reviewModalElement = document.getElementById('reviewModal');
      if (reviewModalElement) {
        const reviewModal = bootstrap.Modal.getInstance(reviewModalElement);
        if (reviewModal) {
          reviewModal.hide();
        }
      }
      this.loadStudentData();
    }, error => {
      console.error('Error submitting review:', error);
      this.showToast('Failed to submit review.', 'error');
    });
  }

  unregisterCourse(courseId: number) {
    const studentId = this.authService.getStudentId();
    this.studentService.unregisterCourse(studentId, courseId).subscribe(response => {
      this.showToast('Successfully unregistered from the course.', 'info');
      this.loadStudentData();
    }, error => {
      console.error('Error unregistering from course:', error);
      this.showToast('Failed to unregister from the course.', 'error');
    });
  }

  private showToast(message: string, type: 'info' | 'error'): void {
    const toastElement = document.getElementById('infoToast');
    if (toastElement) {
      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
      }

      if (type === 'info') {
        toastElement.classList.remove('bg-danger');
        toastElement.classList.add('bg-info');
      } else {
        toastElement.classList.remove('bg-info');
        toastElement.classList.add('bg-danger');
      }

      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}
