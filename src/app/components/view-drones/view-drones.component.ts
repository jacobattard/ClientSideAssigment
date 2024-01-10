import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service'; // Update path as needed
import { Registration } from 'src/app/models/registration.model'; // Assuming Registration model structure

import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-drones',
  templateUrl: './view-drones.component.html',
  styleUrls: ['./view-drones.component.css']
})
export class ViewDronesComponent implements OnInit {
  registrations: Registration[] = [];

  constructor(private router: Router, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    // Fetch registrations from the service/API
    this.registrationService.getRegistrations().subscribe(
      (data: Registration[]) => {
        this.registrations = data.map(registration => ({
          id: registration.id,
          ownerIdCardNumber: registration.ownerIdCardNumber,
          ownerLastName: registration.ownerLastName,
          brandName: registration.brandName,
          modelId: registration.modelId,
          serialNumber: registration.serialNumber,
          ownerFirstName: registration.ownerFirstName,
          ownerContactNumber: registration.ownerContactNumber,
          ownerEmailAddress: registration.ownerEmailAddress
        }));
      },
    );
  }

  onView(registrationId: number) {
    this.router.navigate(['/registration', registrationId]);
  }

  onUpdate(registrationId: number) {
    this.router.navigate(['/update-drone', registrationId]);
  }

  onDelete(registrationId: number) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.registrationService.deleteRegistration(registrationId).subscribe(
        () => {
          console.log('Registration deleted successfully!');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting registration:', error);
        }
      );
    }
  }
  
  exportToExcel(): void {
    this.registrationService.getRegistrations().subscribe((data) => {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(excelBlob, 'registrations.xlsx');
    
    })
  }
  
  exportToPdf(): void {
  this.registrationService.getRegistrations().subscribe((data) => {
    const doc = new jspdf.jsPDF('l', 'mm', 'a3');
    let yPos = 5;
    let xPos = 0;
    data.forEach((record: any) => {
      doc.setFontSize(8);
      doc.text(JSON.stringify(record), xPos, Number(yPos));
      yPos += 5;
      if (xPos >= 250) { 
        doc.addPage(); 
        xPos = 10; 
      }
    });
    doc.save('registrations.pdf');
  });
  }
}


