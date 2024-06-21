import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './student-evaluation.component.html',
  styleUrls: ['./student-evaluation.component.css']
})
export class StudentEvaluationComponent implements OnInit {
  courseId: number = 0;
  studentId: number = 0;
  studentName: string = '';
  courseName: string = '';
  grades: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  evaluation: any = { grade: '', comment: '' };

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = +(this.route.snapshot.paramMap.get('courseId') ?? 0);
    this.studentId = +(this.route.snapshot.paramMap.get('studentId') ?? 0);
    this.courseName = this.route.snapshot.paramMap.get('courseName') ?? '';
    this.loadStudentName();
    this.loadEvaluation();
  }

  loadStudentName(): void {
    this.teacherService.getStudentName(this.studentId).subscribe(student => {
      this.studentName = student.name;
    });
  }

  loadEvaluation(): void {
    this.teacherService.getStudentEvaluation(this.courseId, this.studentId).subscribe(evaluation => {
      if (evaluation) {
        this.evaluation = evaluation;
      } else {
        this.evaluation = { grade: '', comment: '' };
      }
    });
  }

  submitEvaluation(): void {
    const data = {
      courseId: this.courseId,
      studentId: this.studentId,
      grade: this.evaluation.grade,
      comment: this.evaluation.comment
    };
    this.teacherService.submitStudentEvaluation(data).subscribe(() => {
      this.router.navigate(['/student-management', this.courseId, this.courseName]);
    });
  }
}