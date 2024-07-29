import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    CommonModule
  ],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent implements OnInit {

  taskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService: AdminService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
    });
  }

  postTask(){
    console.log(this.taskForm.value);
    this.adminService.postTask(this.taskForm.value).subscribe((res) => {
      if(res.id != null){
        this.snackBar.open('Task created successfully', 'Close', {duration: 5000});
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.snackBar.open('Something went wrong', 'ERROR', {duration: 5000});
      }
    });
  }
}