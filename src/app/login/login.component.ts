import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() role: string = 'student';
  student_id: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.login(this.student_id, this.password, this.role)) {
      this.router.navigate(['/courses']);
    } else {
      alert('Identifiant ou mot de passe incorrect');
    }
  }
}
