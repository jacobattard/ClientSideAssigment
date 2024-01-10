import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://css.teknologija.com/api/registrations';

  constructor(private http: HttpClient) {}

  getRegistrations(): Observable<Registration[]> {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Registration[]>(this.apiUrl, {headers});
  }

  getRegistrationById(id: number): Observable<Registration> {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Registration>(url, {headers});
  }

  addRegistration(formData: any): Observable<any> {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, formData, {headers});
  }

  updateRegistration(registrationId: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${registrationId}`;
    const token = localStorage.getItem('accessToken')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`});

    return this.http.patch(url, data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  deleteRegistration(registrationId: number): Observable<any> {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiUrl}/${registrationId}`;
    return this.http.delete<any>(url, {headers});
  }
  

}
