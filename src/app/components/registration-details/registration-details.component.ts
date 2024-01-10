import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { Registration } from 'src/app/models/registration.model';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {
  registration: Registration | undefined;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const registrationId = +params['id']; // Extract registration ID from route params
      this.registrationService.getRegistrationById(registrationId).subscribe(
        (data: Registration) => {
          this.registration = data; // Assign the retrieved registration details
        }
      );
    });
  }
}
