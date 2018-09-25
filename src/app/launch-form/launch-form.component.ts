import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {
  
  loginModel: any = {};
  emailValid: boolean = false;
  passwordValid: boolean = false;
  constructor( private validator: ValidationService) { }

  ngOnInit() {
  }
  
  onLogIn(){
    console.log("loggin in");
    this.emailValid = this.validator.emailValidation(this.loginModel.email);
    this.passwordValid = this.validator.passwordValidation(this.loginModel.password);
    if(this.emailValid && this.passwordValid){
      
    }
  }

}
