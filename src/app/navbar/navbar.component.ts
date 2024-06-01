import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap'; // Importation de Bootstrap

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

  closeModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        modalElement.addEventListener('hidden.bs.modal', () => {
          document.body.classList.remove('modal-open');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        });
      }
    }
  }
}
