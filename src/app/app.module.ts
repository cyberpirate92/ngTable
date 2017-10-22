import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { NgTableModule } from './ng-table/ng-table.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
