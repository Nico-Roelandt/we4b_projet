import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  userInfo: any = {};
  userRole: string = '';
  defaultAvatar: string = 'src/assets/default.jpg';

  constructor(private authService: AuthService, private userService: UserService, private studentService: StudentService, private teacherService: TeacherService) { }

  
  ngOnInit(): void {
    const userId = this.authService.getStudentId() || this.authService.getTeacherId();
    this.userRole = this.authService.getRole();
    // Récupérer les informations de l'utilisateur
    this.userService.getUserInfo(userId).subscribe(
      data => {
        this.userInfo = data || {};
        if (!this.userInfo.avatar_url) {
          this.userInfo.avatar_url = this.defaultAvatar;
        }
        console.log('User information', this.userInfo);

        this.studentService.getCoursesByStudent(userId).subscribe(
          data => {
            this.userInfo.studentCourses = data;
            console.log('Student courses', this.userInfo.studentCourses);
          },
          error => {
            console.error('Error fetching student courses', error);
            this.userInfo.studentCourses = [];
          }
        );
        
        if(this.userRole === 'teacher') {
          this.teacherService.getCoursesByManager(this.userInfo.username).subscribe(
            data => {
              this.userInfo.teacherCourses = data;
            },
            error => {
              console.error('Error fetching teacher courses', error);
              this.userInfo.teacherCourses = [];
            }
          );
        }
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
