import { Component, OnInit } from '@angular/core';
import {CellValueChangedEvent, ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import { DataSourceService } from '../data-source.service';
import { AppEventType } from '../models/app.event.type';
import { BackendService } from '../services/backend.service';
import { EventQueueService } from '../services/event-queue.service';
import { Sale } from '../models/Sale';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-angular-grid',
  templateUrl: './angular-grid.component.html',
  styleUrls: ['./angular-grid.component.css']
})
export class AngularGridComponent implements OnInit {
  shareCompanyNames: string[] =[];
  selectedButton:string= 'SaleTransaction';
  public columnDefs: ColDef[] = [];
  public rowData: any[] = [] ;

  private gridApi!: GridApi<Sale>;
  constructor(private dataSource: DataSourceService,
    private eventQueue: EventQueueService,
    private backendService: BackendService) { }

  ngOnInit(): void {
    this.eventQueue.On(AppEventType.BasicMetaDataLoaded).subscribe(event => this.buildDefinitions())
    this.eventQueue.On(AppEventType.SalesDataForSelectedFinacialYearLoaded).subscribe(event=> {
      this.selectedButton = 'SaleTransaction';
      this.columnDefs= this.buildColumnDefinitions();
      if(event.payLoad.length === 0){
        this.rowData= [this.getNewRowData()];
      }
      else{
        this.rowData = event.payLoad.concat(this.getNewRowData());
      }
      
    });
  }

  onGridReady(params: GridReadyEvent<Sale>) {
    this.gridApi = params.api;
  }

  buildDefinitions= () =>{
    this.shareCompanyNames = this.dataSource.getShareCompanyNames();
    this.buildDefinitionsAndRowData();
  }

  getNewRowData(): Sale{
    return {
      shareCompany: '',
      costPrice: null,
      sellingPrice: null,
      profitOrLoss: null,
      saleId: uuidv4(),
      financialYear: this.dataSource.getSelectedFinancialYear()
    } as unknown as Sale
  }

  buildColumnDefinitions(): ColDef[] {
      return   [
        {
          field: 'shareCompany',
          editable: this.getEditableValue(),
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: this.shareCompanyNames
          }
        } as ColDef,
        {
          field: 'costPrice',
          editable: this.getEditableValue(),
          cellEditor: 'agTextCellEditor'
        } as ColDef,
        {
          field: 'sellingPrice',
          editable: this.getEditableValue(),
          cellEditor: 'agTextCellEditor'
        } as ColDef,{
          field: 'profitOrLoss'
        }as ColDef,
      ];
  }

  getEditableValue(): boolean {
    return this.selectedButton === 'SaleTransaction'? true : false;
  }

  onCellValueChanged(event: CellValueChangedEvent){
    const data = event.data
    if(event.column.getColId() !== 'shareCompany' && event.rowIndex !== null && data.sellingPrice!=null){
      data.profitOrLoss = data.sellingPrice - data.costPrice;
      this.rowData[event.rowIndex].profitOrLoss = data.profitOrLoss;
      this.gridApi.setRowData(this.rowData);
    }
    this.backendService.updateSale(data).subscribe({
      next: response => {
        console.log('respnse from updating sale is:' + response);
        if(event.rowIndex === this.rowData.length-1){
          this.rowData= this.rowData.concat(this.getNewRowData());
        }
      },
      error: error => { 
        console.log('error from updating sale is:' + error)
      }
    })  
  }

  onButtonChanges() {
    this.buildDefinitionsAndRowData();
  }

  buildDefinitionsAndRowData(){
    this.columnDefs= this.buildColumnDefinitions();
    if (this.selectedButton === 'SaleTransaction') {
      this.rowData= this.dataSource.getSaleData().concat(this.getNewRowData())
    }
    else{
      this.rowData= this.dataSource.getSalesSummaryData();
    }
  }

}
