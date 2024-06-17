import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() role: string = 'student';
  @Output() loginSuccess = new EventEmitter<string>();
  @Output() loginError = new EventEmitter<string>();

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password, this.role).subscribe(success => {
      if (success) {
        this.loginSuccess.emit('Connexion réussie');
        // Redirection après connexion réussie
        this.router.navigate(['/courses']);
      } else {
        this.loginError.emit('Échec de la connexion');
      }
    });
  }
}
