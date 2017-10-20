import {
    Component,
    Input,
    Output,
    OnChanges,
    ViewChild,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Renderer,
    ElementRef,
    forwardRef,
    AfterViewInit,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-tri-state-checkbox',
    template: `<input #theCheckbox type="checkbox" [(ngModel)]="value" (click)="onClick($event)">`
})

export class TristateComponent implements OnChanges {
    public value = false;

    @Input() state: any;
    @Output() onStateChange: EventEmitter<boolean>;
    @ViewChild('theCheckbox') checkbox;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { 
        this.state = false;
        this.onStateChange = new EventEmitter<boolean>();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.state) {
            if (this.state === null) {
                this.value = true;
                this.checkbox.nativeElement.indeterminate = true;
            } else if (this.state === true || this.state === false) {
                this.checkbox.nativeElement.indeterminate = false;
                this.value = this.state;
            }
        }
    }

    public onClick(event: any): void {
        this.onStateChange.emit(!this.value);
    }
}

