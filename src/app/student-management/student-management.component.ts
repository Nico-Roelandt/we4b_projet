import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  courseId: number=0;
  courseName: string= '';
  students: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
    this.courseName = this.route.snapshot.paramMap.get('courseName')!;
    this.loadStudents();
  }

  loadStudents(): void {
    this.teacherService.getCourseStudents(this.courseId).subscribe(students => {
      this.students = students;
    });
  }

  viewStudentEvaluation(studentId: number): void {
    this.router.navigate(['/student-evaluation', this.courseId, studentId, this.courseName]);
  }
}
