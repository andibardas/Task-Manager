import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) { 

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
}
