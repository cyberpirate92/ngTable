import {
    Input,
    Output,
    Component,
    OnInit,
    SimpleChanges,
    OnChanges,
    EventEmitter
} from '@angular/core';

import { RowSelectionEvent } from './row-selection-event';
import { ColumnProps } from './column-props';

@Component({
    selector: 'app-ng-table',
    templateUrl: './ng-table.component.html',
    styleUrls: ['./ng-table.component.css']
})

export class NgTableComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() enableTitleCasedHeaders: boolean;

    @Output() onRowSelected: EventEmitter<RowSelectionEvent>;
    @Output() onRowDeselected: EventEmitter<RowSelectionEvent>;

    private colProps: ColumnProps[];
    private rows: any[][];
    private rowSelectionFlags: boolean[];
    private selectAllFlag: any;
    private colSelectorDropDownFlag: boolean;
    private selectedRowCount: number;

    public static isLowerCase(x: string): boolean {
        return x >= 'a' && x <= 'z';
    }

    public static isUpperCase(x: string): boolean {
        return x >= 'A' && x <= 'Z';
    }

    public static isDigit(x: string): boolean {
        return x >= '0' && x <= '9';
    }

    public static getTitleCasedString(s: string): string {
        s = s.trim();
        let t = '';
        if (s.length !== 0) {
            if (NgTableComponent.isLowerCase(s[0])) {
                t += s[0].toUpperCase();
            } else {
                t += s[0];
            }
            for (let i = 1; i < s.length; i++) {
                if (NgTableComponent.isUpperCase(s[i])) {
                    if (t.length !== 0 && t[t.length - 1] !== ' ') {
                        t += ' ' + s[i];
                    } else {
                        t += s[i];
                    }
                } else if ( (s[i] === '_' || s[i] === ' ')) {
                    if ( t.length !== 0 &&  t[t.length - 1] !== ' ') {
                        t += ' ';
                    }
                } else if (NgTableComponent.isLowerCase(s[i])) {
                    if ( t.length !== 0 &&  t[t.length - 1] === ' ' ) {
                        t += s[i].toUpperCase();
                    } else {
                        t += s[i];
                    }
                } else {
                    t += s[i];
                }
            }
        }
        return t;
    }

    constructor() {
        this.selectAllFlag = false;
        this.enableTitleCasedHeaders = false;
        this.onRowSelected = new EventEmitter<any>();
        this.onRowDeselected = new EventEmitter<any>();
        this.colSelectorDropDownFlag = false;
        this.selectedRowCount = 0;
        this.clear();
    }

    public clear() {
        this.colProps = [];
        this.rows = [];
        this.rowSelectionFlags = [];
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.data) {
            this.extractRowsAndColumns(this.data);
        }
    }

    extractRowsAndColumns(objArray: any[]): void {
        this.clear();
        const propSet = new Set<string>();
        for (let i = 0; i < objArray.length; i++) {
            const keys = Object.keys(objArray[i]);
            for (let j = 0; j < keys.length; j++) {
                propSet.add(keys[j]);
            }
        }

        const cols = Array.from(propSet);
        for (let i = 0; i < cols.length; i++) {
            const colProp: ColumnProps = {
                columnTitle: this.enableTitleCasedHeaders
                    ? NgTableComponent.getTitleCasedString(cols[i])
                    : cols[i],
                propertyName: cols[i],
                visible: true
            };
            this.colProps.push(colProp);
        }

        for (let i = 0; i < objArray.length; i++) {
            const obj = objArray[i];
            const row = [];
            for (let j = 0; j < this.colProps.length; j++) {
                if (obj.hasOwnProperty(this.colProps[j].propertyName)) {
                    row.push(obj[this.colProps[j].propertyName]);
                } else {
                    row.push(null);
                }
            }
            this.rows.push(row);
            this.rowSelectionFlags.push(false);
        }
    }

    private generateObject(row: any[]): any {
        const obj = {};
        if (row.length === this.colProps.length) {
            for ( let i = 0; i < row.length; i++) {
                obj[this.colProps[i].propertyName] = row[i];
            }
        } else {
            throw new Error('Cannot generate object: Column and Row length mismatch');
        }
        return obj;
    }

    private getAllSelectedRows(): any[] {
        const selectedRows = [];
        for (let i = 0; i < this.rowSelectionFlags.length; i++) {
            if (this.rowSelectionFlags[i]) {
                selectedRows.push(this.generateObject(this.rows[i]));
            }
        }
        this.selectedRowCount = selectedRows.length;
        return selectedRows;
    }

    private onRowSelection(row: any[], selectionIndex: number): void {
        if ( selectionIndex < this.rowSelectionFlags.length) {
            this.rowSelectionFlags[selectionIndex] = !this.rowSelectionFlags[selectionIndex];
        }
        const obj: RowSelectionEvent = {
            lastSelection: this.generateObject(row),
            completeSelection: this.getAllSelectedRows(),
        };
        if (this.rowSelectionFlags[selectionIndex]) {
            this.onRowSelected.emit(obj);
        } else {
            this.onRowDeselected.emit(obj);
        }
        if (obj.completeSelection.length === 0) {
            this.selectAllFlag = false;
        } else if (obj.completeSelection.length === this.rows.length) {
            this.selectAllFlag = true;
        } else {
            this.selectAllFlag = null;
        }
    }

    private onSelectAllChange(isChecked: boolean): void {
        for (let i = 0; i < this.rowSelectionFlags.length; i++) {
            this.rowSelectionFlags[i] = isChecked;
        }
        const obj: RowSelectionEvent = {
            lastSelection: null,    // lastSelection will be null for selectAll events
            completeSelection: this.getAllSelectedRows()
        };
        if (isChecked) {
            this.onRowSelected.emit(obj);
        } else {
            this.onRowDeselected.emit(obj);
        }
        this.selectAllFlag = isChecked;
    }

    private toggleColumnSelectionDropdown(): void {
        this.colSelectorDropDownFlag = !this.colSelectorDropDownFlag;
    }
}
