import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + 'api/admin/users', {
      headers: this.createAuthorizationHeader()
    });
  }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/task', taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllTasks(): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + 'api/admin/tasks', {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(BASE_URL + 'api/admin/task/' + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(BASE_URL + `api/admin/task/${id}/edit`, taskDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchTask(title: String): Observable<any>{
    return this.http.get(BASE_URL + `api/admin/tasks/search/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskById(taskId: number): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + 'api/admin/task/' + taskId, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(id: number, content: string): Observable<any> {
    return this.http.post(BASE_URL + `api/admin/task/comment/` + id, content, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentsByTaskId(id: number): Observable<any> {
    if(StorageService.getToken() == null){
      return new Observable();
    }
    return this.http.get(BASE_URL + `api/admin/comments/` + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken());
  }

  
}

