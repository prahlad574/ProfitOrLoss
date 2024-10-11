import { Component, OnInit } from '@angular/core';
import {CellValueChangedEvent, ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import { DataSourceService } from '../data-source.service';
import { AppEventType } from '../models/app.event.type';
import { BackendService } from '../services/backend.service';
import { EventQueueService } from '../services/event-queue.service';
import { ISale } from '../models/ISale';
@Component({
  selector: 'app-angular-grid',
  templateUrl: './angular-grid.component.html',
  styleUrls: ['./angular-grid.component.css']
})
export class AngularGridComponent implements OnInit {
  shareCompanyNames: string[] =[];
  
  public columnDefs: ColDef[] = [];
  public rowData: any[] = [{
    id: '1234',
    shareCompany:'MyWish',
    costPrice: 100,
    sellingPrice: 200,
    profitOrLoss: 100
  } as ISale] ;

  private gridApi!: GridApi<ISale>;
  constructor(private dataSource: DataSourceService,
    private eventQueue: EventQueueService) { }

  ngOnInit(): void {
    this.eventQueue.On(AppEventType.ShareCompaniesLoaded).subscribe(event => this.loadshareCmpanyValues())
  }

  onGridReady(params: GridReadyEvent<ISale>) {
    this.gridApi = params.api;
  }
  loadshareCmpanyValues= () =>{
    this.shareCompanyNames = this.dataSource.getShareCompanyNames();
    this.columnDefs = this.buildColumnDefinitions();
    this.rowData= this.rowData.concat({
      shareCompany: '',
      costPrice: null,
      sellingPrice: null,
      profitOrLoss: null,
      id: '23456'
    } as unknown as ISale);
  }
  
  buildColumnDefinitions(): ColDef[] {
      return   [
        {
          field: 'shareCompany',
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: this.shareCompanyNames
          }
        } as ColDef,
        {
          field: 'costPrice',
          editable: true,
          cellEditor: 'agTextCellEditor'
        } as ColDef,
        {
          field: 'sellingPrice',
          editable: true,
          cellEditor: 'agTextCellEditor'
        } as ColDef,{
          field: 'profitOrLoss'
        }as ColDef,
      ];
  }

  onCellValueChanged(event: CellValueChangedEvent){
    const data = event.data
    if(event.column.getColId() !== 'shareCompany' && event.rowIndex !== null){
      this.rowData[event.rowIndex].profitOrLoss = data.sellingPrice - data.costPrice;
      this.gridApi.setRowData(this.rowData);
    }  
  }

}
