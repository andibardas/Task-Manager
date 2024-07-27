import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DemoAngularMaterialModule, 
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
