import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  userForm: boolean = true;
  authorForm: boolean;

  constructor() { }

  ngOnInit() {
  }

  onUserClick(){
    this.userForm = true;
    this.authorForm =false;
  }

  onAuthorClick(){
    this.authorForm = true;
    this.userForm = false;
  }

}
