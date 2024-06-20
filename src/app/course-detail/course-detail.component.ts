import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any = { teachers: [] }; // Initialisation pour éviter les erreurs de template
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const courseCode = this.route.snapshot.paramMap.get('courseCode');
    if (courseCode) {
      this.courseService.getCourseByCourseCode(courseCode).subscribe(course => {
        // Assurons-nous que les données des enseignants soient correctement traitées
        if (course.teacherNames) {
          course.teachers = course.teacherNames.split(',');
        } else {
          course.teachers = [];
        }
        this.course = course;
      });
      this.courseService.getReviewsByCourseCode(courseCode).subscribe(reviews => {
        this.reviews = reviews;
      });
      console.log('courseCode:', courseCode);
    } else {
      console.error('courseCode is null');
    }

    // Ajouter l'écouteur d'événement pour la fermeture de la modal
    this.addModalCloseListener();
  }

  registerForCourse(): void {
    if (!this.authService.isLoggedIn()) {
      this.showToast('You must be logged in to register for a course.', 'error');
      return;
    }

    const studentId = this.authService.getStudentId(); // Get the student ID from AuthService
    const courseCode = this.course.courseCode;
    //Course id provient du backend et doit etre mis sous forme de number
    const courseId = Number(this.course.id);
    console.log('studentId:', studentId);
    console.log('courseId:', courseId);
    console.log('courseCode:', courseCode);
    //Register
    this.courseService.registerStudentForCourse(studentId, courseId, courseCode).subscribe(response => {
      console.log('response:', response);
      this.showToast('You have successfully registered for the course.', 'success');
    },
    error => {
      if (error.status === 400 && error.error === 'Student already registered for this course') {
        this.showToast('You are already registered for this course.', 'error');
      } else {
        this.showToast('Failed to register for the course.', 'error');
      }
      console.error('Error registering for course:', error);
    });
  }

  private addModalCloseListener(): void {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.classList.remove('modal-open');
      });
    }
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    const toastElement = document.getElementById('courseToast');
    if (toastElement) {
      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
      }

      if (type === 'success') {
        toastElement.classList.remove('bg-danger');
        toastElement.classList.add('bg-success');
      } else {
        toastElement.classList.remove('bg-success');
        toastElement.classList.add('bg-danger');
      }

      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}
