// Include necessary imports and HttpClient

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    constructor(private http: HttpClient) {}

  private apiUrl = 'https://css.teknologija.com/api';

  getBrands() {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiUrl}/brands`;
    return this.http.get<any[]>(url, {headers});
  }

  getModels() {
    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.apiUrl}/models?brandName=DJI`;
    return this.http.get<any[]>(url, {headers});
  }
}
  