import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
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

  constructor(private service: EmployeeService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getEmployeeTasksById().subscribe((res) => {
      console.log(res);
      this.listOfTasks = res;
    });
  }

  updateTaskStatus(id: number, status: string){
    this.service.updateTaskStatus(id, status).subscribe((res) => {
      if(res.id != null){
        console.log(res);
        this.snackbar.open('Task status updated successfully', 'Close', {
          duration: 5000
        });
        this.getTasks();
      } else {
        this.snackbar.open('Error updating task status', 'Close', {
          duration: 5000
        });
      }
    });
  }

}
