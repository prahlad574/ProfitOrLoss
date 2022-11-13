import { Component, OnInit } from '@angular/core';
import {ColDef} from 'ag-grid-community';
@Component({
  selector: 'app-angular-grid',
  templateUrl: './angular-grid.component.html',
  styleUrls: ['./angular-grid.component.css']
})
export class AngularGridComponent implements OnInit {

  public columnDefs: ColDef[] = [
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
  public rowData: any[] = [];
  constructor() { }

  ngOnInit(): void {
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
