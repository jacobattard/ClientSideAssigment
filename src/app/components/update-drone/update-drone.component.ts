import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RegistrationService } from 'src/app/services/registration.service'; // Import your service



@Component({
  selector: 'app-update-drone',
  templateUrl: './update-drone.component.html',
  styleUrls: ['./update-drone.component.css']
})
export class UpdateDroneComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationId!: number;

  models: any[] = [];
  brands: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private droneService: RegistrationService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+[A-Za-z]$/)]],
      modelId: ['', Validators.required],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8)]],
      ownerEmailAddress: ['', [Validators.required, Validators.email]]
    });

    const registrationId = this.route.snapshot.params['id'];

    this.droneService.getRegistrationById(registrationId).subscribe(
      (registration) => {
        this.registrationForm.patchValue({
          serialNumber: registration.serialNumber,
          ownerIdCardNumber: registration.ownerIdCardNumber,
          modelId: registration.modelId,
          ownerFirstName: registration.ownerFirstName,
          ownerLastName: registration.ownerLastName,
          ownerContactNumber: registration.ownerContactNumber,
          ownerEmailAddress: registration.ownerEmailAddress
        });
      },
      (error) => {
        console.error('Error fetching registration details:', error);
      }
    );

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
    const registrationId = this.route.snapshot.params['id'];

    if (this.registrationForm.valid) {
      this.droneService.updateRegistration(registrationId, this.registrationForm.value).subscribe(
        (response) => {
          console.log('Registration updated successfully!', response);
          this.router.navigate(['/view-drones']);
        },
        (error) => {
          console.error('Error updating registration:', error.error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
