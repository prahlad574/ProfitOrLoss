import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FinancialYear } from '../show-financial-year/show-financial-year.component';
import { DataSource } from '@angular/cdk/collections';
import { DataSourceService } from '../data-source.service';
import { EventQueueService } from '../services/event-queue.service';

@Component({
  selector: 'app-financial-year-toggle',
  templateUrl: './financial-year-toggle.component.html',
  styleUrls: ['./financial-year-toggle.component.css']
})
export class FinancialYearToggleComponent implements OnInit {
  @Input() selectedFinancialYear: string= '';
  @Input() financialYears: FinancialYear[] = [];
  constructor(
    private dataSourceService: DataSourceService,
    private eventQueueService: EventQueueService
  ) { }

  ngOnInit(): void {
    
  }
  onFinancialYearChanges(){
    this.dataSourceService.updateSelectedFinancialYear(this.selectedFinancialYear);
  }
  
}
