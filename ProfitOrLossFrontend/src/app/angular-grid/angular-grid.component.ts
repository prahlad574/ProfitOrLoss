import { Component, OnInit } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import { DataSourceService } from '../data-source.service';
import { AppEventType } from '../models/app.event.type';
import { BackendService } from '../services/backend.service';
import { EventQueueService } from '../services/event-queue.service';
@Component({
  selector: 'app-angular-grid',
  templateUrl: './angular-grid.component.html',
  styleUrls: ['./angular-grid.component.css']
})
export class AngularGridComponent implements OnInit {
  shareCompanyNames: string[] =[];
  public columnDefs: ColDef[] = [
    {
      field: 'Share Company',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.shareCompanyNames
      }
    } as ColDef,
    {
      field: 'Cost Price',
      editable: true,
      cellEditor: 'agTextCellEditor'
    } as ColDef,
    {
      field: 'Selling Price'
    } as ColDef,{
      field: 'Profit Or Loss'
    }as ColDef,
  ];
  public rowData: any[] = [{
    shareCompanyName:'',
    costPrice: 100,
    sellingPrice: 200,
    profitOrLoss: 100
  }];
  constructor(private dataSource: DataSourceService,
    private eventQueue: EventQueueService) { }

  ngOnInit(): void {
    this.eventQueue.On(AppEventType.ShareCompaniesLoaded).subscribe(event => this.loadshareCmpanyValues())
  }
    loadshareCmpanyValues= () =>{
      this.shareCompanyNames = this.dataSource.getShareCompanyNames();
    }
 buildColumnDefinitions(): ColDef[] {
    return  [
      {
        field: 'Share Company'
      } as ColDef,
      {
        field: 'Cost Price'
      } as ColDef,
      {
        field: 'Selling Price'
      } as ColDef,{
        field: 'Profit Or Loss'
      }as ColDef,
    ];
  }
}
