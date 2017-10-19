import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timer: any;
  count = 0;
  constructor() {
  }
  title = 'app';
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
  }, {
    'id': 3,
    'name': 'Noell',
    'last_name': 'Bea',
    'email': 'nbea2@imageshack.us',
    'gender': 'Female',
    'ip_address': '180.66.162.255'
  }, {
    'id': 4,
    'name': 'Willard',
    'last_name': 'Valek',
    'email': 'wvalek3@vk.com',
    'gender': 'Male',
    'ip_address': '67.76.188.26'
  }];

  public addItem(obj: any = this.data[this.data.length - 1]): void {
    this.data.push(obj);
    this.data = this.data.slice(0);
  }

  public onSubmit(val: any): void {
    const item = {
      id: 5,
      name: val.fName,
      last_name: val.lName,
      email: val.email,
      gender: val.gender,
      ip_address: null
    };
    this.addItem(item);
  }
}
