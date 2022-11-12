import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../services/backend.service';

export interface ShareCompany{
  shareCompanyId: number;
  shareCompanyName: string;
}
@Component({
  selector: 'app-show-share-company',
  templateUrl: './show-share-company.component.html',
  styleUrls: ['./show-share-company.component.css']
})
export class ShowShareCompanyComponent implements OnInit {
  displayedColumns: string[] = ['select','shareCompanyId', 'shareCompanyName'];
  dataSource= new MatTableDataSource<ShareCompany>();
  selection = new SelectionModel<ShareCompany>(true, []);
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getShareCompany().subscribe(r => this.dataSource = new MatTableDataSource<ShareCompany>(r));
  }
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
  checkboxLabel(row?: ShareCompany): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.shareCompanyId + 1}`;
  }

  deleteShareCompany(){
    this.selection.selected.forEach(x => {
      this.backendService.deleteShareCompany(x.shareCompanyId).subscribe(r => console.log(r));
      this.selection.clear();
      this.dataSource.data = this.dataSource.data.filter(y => y.shareCompanyId !== x.shareCompanyId);
    });
  }
}
