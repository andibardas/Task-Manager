import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | undefined {
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem(TOKEN)!;
    }
    return undefined;
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER)!);
  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined' && this.getToken() != null) {
      const role: string = this.getUserRole();
      return role === 'ADMIN';
    }
    return false;
  }

  static isEmployeeLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined' && this.getToken() != null) {
      const role: string = this.getUserRole();
      return role === 'EMPLOYEE';
    }
    return false;
  }

  static getUserId(): string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.id;
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
