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
    @Input() enableTitleCasedHeaders: boolean;

    private columnHeaders: string[];
    private properties: string[];
    private rows: string[][];

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
        console.log('Before=> "' + s + '"');
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
        console.log('After=> "' + t + '"');
        return t;
    }

    constructor() {
        this.enableTitleCasedHeaders = false;
        this.clear();
    }

    public clear() {
        this.columnHeaders = [];
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
        this.clear();
        const propSet = new Set<string>();
        for (let i = 0; i < objArray.length; i++) {
            const keys = Object.keys(objArray[i]);
            for (let j = 0; j < keys.length; j++) {
                propSet.add(keys[j]);
            }
        }

        this.properties = Array.from(propSet);

        if (!this.enableTitleCasedHeaders) {
            this.columnHeaders = this.properties;
        } else {
            const cols = this.properties.slice(0);
            for (let i = 0; i < cols.length; i++) {
                this.columnHeaders.push(NgTableComponent.getTitleCasedString(cols[i]));
            }
        }

        for (let i = 0; i < objArray.length; i++) {
            const obj = objArray[i];
            const row = [];
            for (let j = 0; j < this.properties.length; j++) {
                if (obj.hasOwnProperty(this.properties[j])) {
                    row.push(obj[this.properties[j]]);
                } else {
                    row.push(null);
                }
            }
            this.rows.push(row);
        }
    }
}
