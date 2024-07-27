import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    console.log(this.signupForm.value);
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if(password !== confirmPassword){
      this.snackBar.open('Passwords do not match', 'Close', {duration: 5000, panelClass: "error-snackbar"});
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null){
        this.snackBar.open('Signup successful', 'Close', {duration: 5000});
        this.router.navigateByUrl('/login');
      } else {
        this.snackBar.open('Signup failed', 'Close', {duration: 5000, panelClass: "error-snackbar"});
      }
    });
  }
}
