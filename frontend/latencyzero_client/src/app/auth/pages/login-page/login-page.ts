import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  formUtils = FormUtils;

  showPassword: boolean = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]]
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { username = '', password = '' } = this.loginForm.value;

      this.authService.login(username!, password!).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/home');
        }
      });
    }

  }
}
