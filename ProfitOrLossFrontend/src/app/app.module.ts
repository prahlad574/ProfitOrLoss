import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { AddShareCompanyComponent } from './add-share-company/add-share-company.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowFinancialYearComponent } from './show-financial-year/show-financial-year.component';
import { ShowShareCompanyComponent } from './show-share-company/show-share-company.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AgGridModule } from 'ag-grid-angular';
import { AngularGridComponent } from './angular-grid/angular-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFinancialYearComponent,
    AddShareCompanyComponent,
    ShowFinancialYearComponent,
    ShowShareCompanyComponent,
    AngularGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    AgGridModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
