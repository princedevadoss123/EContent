import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation/validation.service';
import { HTTPClientService } from '../services/HTTPClient/httpclient.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  
  userForm: boolean = true;
  authorForm: boolean;
  model: any = {};

  emailValidator: boolean = true;
  passwordValidator:boolean = true;
  confPasswordValidator:boolean = true;
  phoneNumberValidator:boolean = true;
  intialModelCheck : boolean = false;

  constructor(private validator: ValidationService,
  private httpClient: HTTPClientService) { }

  ngOnInit() { }

  onUserClick(){
    this.userForm = true;
    this.authorForm =false;
  }

  onAuthorClick(){
    this.authorForm = true;
    this.userForm = false;
  }
 
  passwordChecker() {
    console.log("Inside Password Checker");
    if(this.intialModelCheck) {
      this.validator.passwordValidation(this.model.password) ? this.passwordValidator = true : this.passwordValidator = false;
    } 
  }

  emailChecker() {
    console.log("Inside Email Checker");
    if(this.intialModelCheck) {
      this.validator.emailValidation(this.model.username) ? this.emailValidator = true : this.emailValidator = false;
    }
  }

  phoneNumberChecker() {
    console.log("Inside PhoneNumber Checker");
    if(this.intialModelCheck) {
      this.validator.phoneNumberValidation(this.model.phoneNumber) ? this.phoneNumberValidator =true : this.phoneNumberValidator = false;
    }
  }

  register(userForm) {
  
    this.intialModelCheck = true
    this.emailChecker();
    this.passwordChecker();
    this.phoneNumberChecker();

    if(this.emailValidator && this.passwordValidator && this.phoneNumberValidator)
    {
      
      var registerUserData = {
        userName: this.model.userName,
        password : this.model.password,
        phoneNumber : this.model.phoneNumber,
        emailId : this.model.email
      };
       
      this.httpClient.register(registerUserData).subscribe( res => {
          alert("success")
        },
        err => {
          console.log("Error occured");
        }
      );
      
    }
  }

}