import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    CommonModule
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit{

  id: number = this.route.snapshot.params['id'];
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService: AdminService, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) { 
    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getTaskById(this.id);
    this.getUsers();
  }

  getTaskById(taskId: number){
    this.adminService.getTaskById(this.id).subscribe((res) => {
      this.updateTaskForm.patchValue(res);
      console.log(res);
    });
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
      console.log(res);
    });
  }

  updateTask(){
    console.log(this.updateTaskForm.value);
    this.adminService.updateTask(this.id, this.updateTaskForm.value).subscribe((res) => {
      if(res.id != null){
        this.snackBar.open('Task updated successfully', 'Close', {duration: 5000});
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.snackBar.open('Something went wrong', 'ERROR', {duration: 5000});
      }
    });
  }
}
