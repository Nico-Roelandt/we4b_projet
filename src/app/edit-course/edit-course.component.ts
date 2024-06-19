import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseId!: number;  
  course: any = {
    courseManager: '',
    teachers: '',
    categories: '',
    courseName: '',
    courseCode: '',
    branch: '',
    major: '',
    credits: 0,
    seatLimit: 0,
    studentsRegistered: 0,
    bibliography: '',
    location: '',
    program: ''
  };

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.teacherService.getCourseById(this.courseId).subscribe(course => {
      // 将课程信息分配给 this.course
      this.course = {
        ...course,
        teachers: course.teachers.join(', '),
        categories: course.categories.join(', ')
      };
    });
  }

  saveCourse() {
    const updatedCourse = {
      ...this.course,
      teachers: this.course.teachers.split(',').map((teacher: string) => teacher.trim()),
      categories: this.course.categories.split(',').map((category: string) => category.trim())
    };

    this.teacherService.updateCourse(this.courseId, updatedCourse).subscribe(() => {
      this.router.navigate(['/teacher-center']);
    });
  }

  deleteCourse() {
    this.teacherService.deleteCourse(this.courseId).subscribe(() => {
      this.router.navigate(['/teacher-center']);
    });
  }

  goBack() {
    this.router.navigate(['/teacher-center']);
  }
}
