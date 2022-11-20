import { Injectable } from '@angular/core';
import { AppEvent } from './models/app.event';
import { AppEventType } from './models/app.event.type';
import { BackendService } from './services/backend.service';
import { EventQueueService } from './services/event-queue.service';
import { ShareCompany } from './show-share-company/show-share-company.component';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
shareCompanyNames: ShareCompany[] = [];
  constructor(private backendService: BackendService,
    private eventQueue: EventQueueService) { }

  getAndMapShareCompanies = () => {
    this.backendService.getShareCompany().subscribe(r => {
      this.shareCompanyNames = r;
      console.log(this.shareCompanyNames);
      this.eventQueue.dispatch(new AppEvent(AppEventType.ShareCompaniesLoaded,''));
    });
    
  }
  getShareCompanyNames= (): string[] => {
    return this.shareCompanyNames.map(x => x.shareCompanyName);
  }
}
