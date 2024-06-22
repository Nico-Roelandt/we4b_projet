import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  userInfo: any = {};
  userRole: string = '';
  defaultAvatar: string = 'src/assets/default.jpg';

  constructor(private authService: AuthService, private userService: UserService) { }

  
  ngOnInit(): void {
    const userId = this.authService.getStudentId() || this.authService.getTeacherId();
    this.userRole = this.authService.getRole();
    this.userService.getUserInfo(userId).subscribe(
      data => {
        this.userInfo = data || {};
        if (!this.userInfo.avatar_url) {
          this.userInfo.avatar_url = this.defaultAvatar;
        }
        this.userInfo.studentCourses = this.userInfo.studentCourses ? this.userInfo.studentCourses.split(',') : [];
        this.userInfo.teacherCourses = this.userInfo.teacherCourses ? this.userInfo.teacherCourses.split(',') : [];
      },
      error => {
        console.error('Error fetching user information', error);
        this.userInfo.avatar_url = this.defaultAvatar;
        this.userInfo.studentCourses = [];
        this.userInfo.teacherCourses = [];
      }
    );
  }
  
}
