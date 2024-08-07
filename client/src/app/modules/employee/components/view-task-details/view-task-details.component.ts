import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    CommonModule
  ],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {
  taskId: number = this.activatedRoute.snapshot.params['id'];
  taskData: any;
  comments: any;
  commentForm!: FormGroup; 

  constructor(private service: EmployeeService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private snackbar: MatSnackBar) {}

  ngOnInit(){
    this.getTaskById();
    this.getComments();
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    });
  }

  getTaskById(){
    this.service.getTaskById(this.taskId).subscribe((res) => {
      this.taskData = res;
    });
  }

  getComments(){
    this.service.getCommentsByTaskId(this.taskId).subscribe((res) => {
      this.comments = res;
    });
  }

  publishComment(){
    this.service.createComment(this.taskId, this.commentForm.get("content")?.value).subscribe((res) => {
      if(res.id != null){
        this.snackbar.open("Comment added successfully", "Close", {
          duration: 5000
        });
        this.getComments();
      } else {
        this.snackbar.open("Error adding comment", "Close", {
          duration: 5000
        });
      }
    });
  }
}
