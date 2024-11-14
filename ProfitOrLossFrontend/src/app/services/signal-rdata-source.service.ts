import { Injectable } from '@angular/core';
import { DataSourceService } from '../data-source.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRDataSourceService {

  constructor(private dataSource: DataSourceService) { }

  addOrDeleteMetadata(message: any) { 
    switch(message.operation){
      case 0:
        this.dataSource.addMetaData(message);
        break;
      case 1:
        this.dataSource.deleteMetaData(message);
        break
    }
  }
}
