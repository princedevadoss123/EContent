import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  userModel: any = {};
  authorModel: any = {};
  userForm: boolean = true;
  authorForm: boolean;
  usernameValidator: boolean = true;
  emailValidator: boolean = true;
  passwordValidator:boolean = true;
  mobileValidator: boolean = true;
  intialModelCheck:boolean = false;

  constructor(private validator: ValidationService) { }

  ngOnInit() {
  }

  onUserClick(){
    this.userForm = true;
    this.authorForm = false;
    this.authorModel = {};
  }

  onAuthorClick(){
    this.authorForm = true;
    this.userForm = false;
    this.userModel = {};
  }

  onSignUp(){
    
  }

}
