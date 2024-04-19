import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-headeraccesso',
  templateUrl: './headeraccesso.component.html',
  styleUrl: './headeraccesso.component.css'
})
export class HeaderaccessoComponent {
  constructor(private auth : AuthService) {}
  logout(){
    // localStorage.removeItem('access_token');
    this.auth.removeAuthenticated();
  }
}
