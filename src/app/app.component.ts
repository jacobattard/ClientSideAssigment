import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; // Update path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DronesAssignment';
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  signOut(): void {
    console.log("SIGNED OUT")
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
