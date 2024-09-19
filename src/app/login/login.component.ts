import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formData = {
    userName: null,
    password: null,
  };
  onSubmit(loginForm: any) {
    if (loginForm.invalid) {
      Object.keys(loginForm.controls).forEach((field) => {
        const control = loginForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
  }
}
