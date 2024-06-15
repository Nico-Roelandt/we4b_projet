import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseCode = this.route.snapshot.paramMap.get('courseCode');
    if (courseCode) {
      this.courseService.getCourseByCourseCode(courseCode).subscribe(course => {
        this.course = course;
      });
      this.courseService.getReviewsByCourseCode(courseCode).subscribe(reviews => {
        this.reviews = reviews;
      });
    } else {
      console.error('courseCode is null');
    }
  }
}
