import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Import your authentication service
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (response) => {
          if(this.authService.isUserLoggedIn()) {
            this.router.navigate(['/view-drones']);
          } else {
            this.loginError = "Incorrect email or password";
          }
        },
        (error) => {
          this.loginError = "Incorrect email or password";
        }
      );
    } else {
      this.loginError = "Incorrect email or password"
    }
  }
}
