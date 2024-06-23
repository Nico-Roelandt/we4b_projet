import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Montre un toast de succès
  showSuccessToast(message: string) {
    const toastElement = document.getElementById('successToast');
    if (toastElement) {
      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    }
  }

  // Le toast d'erreur
  showErrorToast(message: string) {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    }
  }

  // Ferme la modal de facon propre
  closeModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        modalElement.addEventListener('hidden.bs.modal', () => {
          setTimeout(() => {
            const modalBackdrops = document.querySelectorAll('.modal-backdrop');
            modalBackdrops.forEach(backdrop => backdrop.remove());
            document.body.classList.remove('modal-open');
            document.body.style.overflow = ''; 
            console.log('Body classes after modal close:', document.body.classList);
            console.log('Body style after modal close:', document.body.style.overflow);
          }, 200);
        });
      }
    }
  }
}