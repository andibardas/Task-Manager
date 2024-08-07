import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeTasksById(): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + 'api/employee/tasks', {
      headers: this.createAuthorizationHeader()
    });
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + `api/employee/task/${id}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskById(taskId: number): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + 'api/employee/task/' + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(id: number, content: string): Observable<any> {
    return this.http.post(BASE_URL + `api/employee/task/comment/` + id, content, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentsByTaskId(id: number): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + `api/employee/comments/` + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken());
  }
}
