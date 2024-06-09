import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 

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
      this.feedback = data.feedback;
    });
  }

  submitFeedback(courseId: number, feedback: string) {
    this.studentService.submitFeedback(courseId, feedback).subscribe(response => {
      // Logique de traitement après la soumission des commentaires
    });
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
