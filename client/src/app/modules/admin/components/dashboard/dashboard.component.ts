import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  listOfTasks: any = [];
  searchForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder, private snackBar: MatSnackBar) { 
    this.searchForm = this.fb.group({
      title: [null]
    });
  }
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.adminService.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  deleteTask(taskId: number){
    this.adminService.deleteTask(taskId).subscribe((res) => {
      this.snackBar.open('Task deleted successfully', 'Close', {duration: 5000});
      this.getTasks();
    });
  }

  searchTask(){
    this.listOfTasks = [];
    const title = this.searchForm.get('title')?.value;
    if(title == null || title == ''){
      this.getTasks();
      return;
    }
    this.adminService.searchTask(title).subscribe((res) => {
      this.listOfTasks = res;
    });

    // return;
  }
}
