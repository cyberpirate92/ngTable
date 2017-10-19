import {
    Input,
    Output,
    Component,
    OnInit,
    SimpleChanges,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'app-ng-table',
    templateUrl: './ng-table.component.html',
    styleUrls: ['./ng-table.component.css']
})

export class NgTableComponent implements OnInit, OnChanges {

    @Input() data: any[];

    private columns: string[];
    private rows: string[][];

    constructor() {
        this.columns = [];
        this.rows = [];
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
        const colSet = new Set<string>();
        for (let i = 0; i < objArray.length; i++) {
            const keys = Object.keys(objArray[i]);
            for (let j = 0; j < keys.length; j++) {
                colSet.add(keys[j]);
            }
        }
        this.columns = Array.from(colSet);

        for (let i = 0; i < objArray.length; i++) {
            const obj = objArray[i];
            const row = [];
            for (let j = 0; j < this.columns.length; j++) {
                if (obj.hasOwnProperty(this.columns[j])) {
                    row.push(obj[this.columns[j]]);
                } else {
                    row.push(null);
                }
            }
            this.rows.push(row);
        }
    }
}
