import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { AuthServiceService } from '../services/auth-api/auth-service.service';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {
  
  loginModel: any = {};
  emailValid: boolean = false;
  passwordValid: boolean = false;
  constructor( private validator: ValidationService, private authenticator: AuthServiceService) { }

  ngOnInit() {
  }
  
  onLogIn(){
    console.log("loggin in");
    this.emailValid = this.validator.emailValidation(this.loginModel.email);
    this.passwordValid = this.validator.passwordValidation(this.loginModel.password);
    if(this.emailValid && this.passwordValid){
      var loginData = {
        emailId: this.loginModel.email,
        password: this.loginModel.password
      };
      console.log(loginData);
      this.authenticator.login(loginData)
        .subscribe(
          res => {
            console.log(res);
          }
        );
    }
  }

}
