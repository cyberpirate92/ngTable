import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgTableComponent } from './ng-table/ng-table.component';
import { AlertModule } from 'ngx-bootstrap';
import { TristateComponent } from './ng-table/tristate.component';

@NgModule({
  declarations: [
    AppComponent,
    NgTableComponent,
    TristateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
