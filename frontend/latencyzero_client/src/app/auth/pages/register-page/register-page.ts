import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../../../utils/form-utils';
import { RegisterDTO } from '../../interfaces/register-dto.interface';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  formUtils = FormUtils;

  showPassword: boolean = false;

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const registerData: RegisterDTO = this.registerForm.value as RegisterDTO;

      this.authService.register(registerData).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/auth/login');
          return;
        }
      });
    }
  }

}
