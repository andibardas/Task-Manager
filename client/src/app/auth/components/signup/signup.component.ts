import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from './validators/password.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {validators: passwordMatchValidator});
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    console.log(this.signupForm.value);
  }
}
