import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {}

  emailValidation(email) {
     var regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
     return regexp.test(email);
    //return true;
  }

  emptyValidation(content) {
    return (content.length > 0);
  }

  passwordValidation(password) {
    var regexp = new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    return regexp.test(password);
  }

  phoneNumberValidation(phoneNumber) {
    return new RegExp('^[0-9]+$').test(phoneNumber);
  }

}
