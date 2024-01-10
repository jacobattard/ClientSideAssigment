import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service'; // Adjust this path
import { ApiService } from 'src/app/services/api.service'; // Adjust this path
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.css']
})
export class AddDroneComponent {
  registrationForm!: FormGroup;
  models: any[] = [];
  brands: any[] = [];


  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private apiService: ApiService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      serialNumber: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+[A-Za-z]$/)]],
      modelId: ['', Validators.required],
      selectedBrand: [''],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8)]],
      ownerEmailAddress: ['', [Validators.required, Validators.email]]
    });

    this.fetchBrands();
  }

  onBrandSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.fetchModels(selectedValue);
    }
  }
  
  fetchBrands() {
    this.apiService.getBrands().subscribe((brands) => {
      this.brands = brands; // Assign fetched brands to the local variable
    });
  }

  fetchModels(brandName: string) {
    const apiUrl = 'https://css.teknologija.com/api';
    const url = `${apiUrl}/models?brandName=${brandName}`;

    const token = localStorage.getItem('accessToken')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(url, {headers}).subscribe((models) => {
      this.models = models; // Assign fetched models to the local variable
    });
  }

  onSubmit() {
    
    const formData = this.registrationForm.value;
    console.log(JSON.stringify(formData));
      // Call the service method to add a new registration
      this.registrationService.addRegistration(formData).subscribe(
        (response) => {
          console.log('Drone registration added:', response);
          this.router.navigate(['/view-drones']);
        },
        (error) => {
          console.error('Error adding drone registration:', error);
        }
      );
    
  }
}
