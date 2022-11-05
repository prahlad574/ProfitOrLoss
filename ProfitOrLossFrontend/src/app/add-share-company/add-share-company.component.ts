import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-add-share-company',
  templateUrl: './add-share-company.component.html',
  styleUrls: ['./add-share-company.component.css']
})
export class AddShareCompanyComponent implements OnInit {
  shareCompanyName!: string;
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  saveShareCompany(){
    this.backendService.addShareCompany(this.shareCompanyName).subscribe(r => console.log(r));
  }
}
