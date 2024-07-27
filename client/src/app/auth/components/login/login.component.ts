import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
            console.log(res);
            const user = {
                id: res.userId,
                role: res.userRole
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);
            if (StorageService.isAdminLoggedIn()) {
                this.router.navigateByUrl('/admin/dashboard').then(() => {
                    window.location.reload();
                });
            } else if (StorageService.isEmployeeLoggedIn()) {
                this.router.navigateByUrl('/employee/dashboard').then(() => {
                    window.location.reload();
                });
            }
            this.snackBar.open('Login successful', 'Close', { duration: 5000 });
        },
        error: () => {
            this.snackBar.open('Invalid credentials', 'Close', { duration: 5000 });
        }
    });
}
}
