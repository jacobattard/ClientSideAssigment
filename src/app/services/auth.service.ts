import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://css.teknologija.com/api/auth'; // Your API endpoint
  private isLoggedin = false;

  constructor(private http: HttpClient) {}

  userRoles: string[] = []; // Placeholder for user roles, fetched after login
  
  isUserLoggedIn(): boolean {
    return this.isLoggedin;
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    
    const apiUrl = 'https://css.teknologija.com/api/auth';

    return this.http.post<any>(apiUrl, credentials).pipe(
      map(response => {
        // Assuming the API returns a token upon successful login
        if (response) {
          this.isLoggedin = true;
          localStorage.setItem('accessToken', response['accessToken'])
          console.log(response['accessToken'])
          console.log("Yes")
          return true;
        } else {
          console.log("no")
          return false;
        }
      }),
      catchError(() => {
        console.log("nono")
        return of(false);
      })
    );
  }

  logout(): void {
    this.isLoggedin = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedin;
  }
}
