import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseCode!: string;  
  courseId! : number;
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
    private courseService: CourseService,
    private router: Router
  ) { }

  // Récupérer les informations du cours
  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.courseCode = this.route.snapshot.paramMap.get('courseCode')!;
    this.courseService.getCourseByCourseCode(this.courseCode).subscribe(course => {
      this.course = {
        ...course,
        teachers: course.teachers.join(', '),
        categories: course.categories.join(', ')
      };
    });
  }

  // Enregistrer les modifications
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

  // Supprimer le cours
  deleteCourse() {
    this.teacherService.deleteCourse(this.courseId).subscribe(() => {
      this.router.navigate(['/teacher-center']);
    });
  }

  // Retourner à la page précédente
  goBack() {
    this.router.navigate(['/teacher-center']);
  }
}
