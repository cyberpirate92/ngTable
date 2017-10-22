import { TristateComponent } from './tristate.component';
import { FormsModule } from '@angular/forms';
import { NgTableComponent } from './ng-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NgTableComponent,
    TristateComponent
  ],
  exports: [NgTableComponent]
})

export class NgTableModule { }
