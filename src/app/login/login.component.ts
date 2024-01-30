import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Create AuthService for handling authentication
import { Router } from '@angular/router'; // Add this line

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: any = '';
  password: any = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit');
    if (this.authService.hasToken()) {
      this.authService.validateToken(localStorage.getItem('token') || '').subscribe({
        next: (valid) => {
          console.log('Token valid:', valid);
          if (valid) {
            console.log('Token valid, redirecting to dashboard');
            //this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Token validation failed:', error);
        },
      });
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (token: any) => {
        console.log('TOKEN:', token);
        localStorage.setItem('token', token.token);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
