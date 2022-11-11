import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../services/backend.service';

export interface FinancialYear{
  financialYearId: number;
  financialYearName: string;
}
@Component({
  selector: 'app-show-financial-year',
  templateUrl: './show-financial-year.component.html',
  styleUrls: ['./show-financial-year.component.css']
})
export class ShowFinancialYearComponent implements OnInit {
  displayedColumns: string[] = ['select','financialYearId', 'financialYearName'];
  dataSource= new MatTableDataSource<FinancialYear>();
  selection = new SelectionModel<FinancialYear>(true, []);
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getFinancialYear().subscribe(r => this.dataSource = new MatTableDataSource<FinancialYear>(r));
    console.log(this.dataSource);
  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: FinancialYear): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.financialYearId + 1}`;
    }

    deleteFinancialYear(){
      this.selection.selected.forEach(x => {
        this.backendService.deleteFinancialYear(x.financialYearId).subscribe(r => console.log(r));
        this.selection.clear();
        this.dataSource.data = this.dataSource.data.filter(y => y.financialYearId !== x.financialYearId);
      });
    }
}
