import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DemoAngularMaterialModule, 
    RouterModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isEmployeeLoggedin: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedin: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router) {}

  setIsEmployeeLoggedin(isEmployeeLoggedin: boolean) {
    this.isEmployeeLoggedin = isEmployeeLoggedin;
  }

  setIsAdminLoggedin(isAdminLoggedin: boolean) {
    this.isAdminLoggedin = isAdminLoggedin;
  }

  logout(){
    StorageService.logout();
    this.isEmployeeLoggedin = false;
    this.isAdminLoggedin = false;
    this.router.navigateByUrl('/login');
  }
}
