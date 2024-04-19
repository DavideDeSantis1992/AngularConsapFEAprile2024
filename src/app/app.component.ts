import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'consap';
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.redirectIfRequired();
  }

  // redirectIfRequired(): void {
  //   if (this.authService.isAuthenticated()) {
      
  //     if (this.router.url === 'localhost:4200/login' || this.router.url === '/home' || this.router.url === '/') {
  //       this.router.navigate(['/homeaccesso']);
  //     }
  //   }
  // }
}
