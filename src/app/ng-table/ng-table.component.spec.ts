import { FormsModule } from '@angular/forms';
import { TristateComponent } from './tristate.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableComponent } from './ng-table.component';

describe('NgTableComponent', () => {
    let component: NgTableComponent;
    let fixture: ComponentFixture<NgTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgTableComponent, TristateComponent],
            imports: [FormsModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

describe('getTitleCasedString() should return title cased strings', () => {
    const testStrings = [
        'firstName',
        'lastName',
        'first_name',
        'first_Name',
        'First Name',
        'first Name',
        'first*name',
        'first__name',
        'first name',
        'first  name',
        'firstname'
    ];
    const expectedResults = [
        'First Name',
        'Last Name',
        'First Name',
        'First Name',
        'First Name',
        'First Name',
        'First*name',
        'First Name',
        'First Name',
        'First Name',
        'Firstname'
    ];

    it('should return title cased strings', () => {
        expect(testStrings.length).toBe(expectedResults.length);
        for (let i = 0; i < testStrings.length; i++) {
            expect(NgTableComponent.getTitleCasedString(testStrings[i])).toBe(expectedResults[i]);
        }
    });
});
