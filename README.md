# NgTable

An Angular Table View component for binding with Object Arrays.

## Getting started

This is still a work in progress, so the code is not hosted in NPM or any other repos. You have to manually copy the `src/app/ng-table` folder and include it in your project if you want to try it.

After copying to your project, the following steps can be followed to use the NgTable component

Import `NgTableModule` into your module
```typescript
import { NgTableModule } from '../ng-table/ng-table.module';
```
Declare `NgTableModule` in your module's `imports`
```typescript
@NgModule({
  ..
  imports: [
    ..
    NgTableModule,
    ..
  ],
  ..
})

```
In your `*.component.html` or component `template` or wherever you want to use NgTable, just use the `<ng-table>` directive.

### Directive inputs:

The following are the inputs that have to be provided to the `NgTable` component.

`data: any[]`: The object array which is to be displayed.

`enableTitleCasedHeaders: boolean`: when `true`, Views column headers in title cased object properties (**Example:** A propery `first_name` will have the column header as `First Name`)

`enableColumnSelection: boolean`: when `true`, A dropdown menu is displayed, so the columns could be hidden dynamically.

### Events

The following are the events that could be emitted from the `NgTable` component.

`onRowSelected: RowSelectionEvent`: Event occurs whenever a row is selected.

`onRowDeselected: RowSelectionEvent`: Event occurs whenever a row is deselected.

```typescript
export interface RowSelectionEvent {
    lastSelection: any;
    completeSelection: any[];
}
```

The `RowSelectionEvent` contains the last selected/deselected row in the `lastSelection` property and the overall selection in the `completeSelection` property. 

In case of selection using Select All checkbox from the table header, `lastSelection` will be `null`.

### Example

The below example will generate a table with 6 columns and 2 rows

**app.component.html**
```html
<div>
  <ng-table 
      [data]="data" 
      [enableTitleCasedHeaders]="true" 
      [enableColumnSelection]="true"
      (onRowSelected)="onRowSelected($event)">
  </ng-table>
</div>
```
**app.component.ts**
```typescript

import { RowSelectionEvent } from '../ng-table/ng-table.module';

export class AppComponent {
  ..
  data = [{
    'id': 1,
    'name': 'Jeanette',
    'last_name': 'Penddreth',
    'email': 'jpenddreth0@census.gov',
    'gender': 'Female',
    'ip_address': '26.58.193.2'
  }, {
    'id': 2,
    'name': 'Giavani',
    'last_name': 'Frediani',
    'email': 'gfrediani1@senate.gov',
    'gender': 'Male',
    'ip_address': '229.179.4.212'
  }];
  
  // event handler
  public onRowSelected(event: RowSelectionEvent) {
    console.log(event);
  }
  ..
}
```
