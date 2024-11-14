import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { v4 as uuidv4 } from 'uuid';
import { ShareCompany } from '../show-share-company/show-share-company.component';

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

    let shareCompany = {
      shareCompanyId: uuidv4(),
      shareCompanyName: this.shareCompanyName
    } as unknown as ShareCompany;

    this.backendService.addShareCompany(shareCompany).subscribe({
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
