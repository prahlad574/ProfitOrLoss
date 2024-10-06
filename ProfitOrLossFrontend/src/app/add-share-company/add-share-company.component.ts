import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-add-share-company',
  templateUrl: './add-share-company.component.html',
  styleUrls: ['./add-share-company.component.css']
})
export class AddShareCompanyComponent implements OnInit {
  shareCompanyName!: string;
  successMessage!: string;
  errorMessage!: string;
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  saveShareCompany(){
    this.successMessage='';
    this.errorMessage='';

    this.backendService.addShareCompany(this.shareCompanyName).subscribe({
      next: response => {
         this.successMessage='Share company got added successfully';
      },
      error: error => {
        this.errorMessage='Error occurred while saving Share Company';
        console.log('There was an error while saving share company:', error);
      }
    });
  }
}
