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
      this.courseService.getCourseByCourseCode(courseCode).subscribe(courses => {
        if (courses.length > 0) {
          this.course = courses[0];
          this.loadReviews(this.course.id);
        } else {
          console.error('Course not found');
        }
      });
    } else {
      console.error('courseCode is null');
    }
  }

  loadReviews(courseId: number): void {
    this.courseService.getReviewsByCourseId(courseId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
