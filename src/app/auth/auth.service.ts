import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly STORAGE_KEY = 'access_token';
  
  constructor() { }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  setAuthenticated(access_token: string): void {
    localStorage.setItem(this.STORAGE_KEY, access_token);
  }

  removeAuthenticated(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
