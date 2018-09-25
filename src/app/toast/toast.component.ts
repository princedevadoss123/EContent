import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MessageType : string[] = ['snackbar successShow','snackbar infoShow','snackbar warnShow','snackbar errorShow'];
  selectedMsg: string;
  currentCSSClass:string = 'snackbar';

  setCSSClass(msg){
    // if(this.currentCSSClass == 'snackbar')
    // {
    //   //setTimeout(function(){ this.currentCSSClass = x.className.replace("show", ""); }, 3000);
    //     this.currentCSSClass = 'snackbar successShow';
    // }
    // else
    // {
    //   this.currentCSSClass = 'snackbar';
    // }
    console.log(msg);
    console.log(this.currentCSSClass);
    this.currentCSSClass = msg;
    // switch(msg)
    //   {
    //     case 'Success' :
    //       this.currentCSSClass = 'snackbar successShow';
    //       break;
    //     case 'Info' :
    //       this.currentCSSClass = 'snackbar infoShow';
    //       break;
    //     case 'Warn' :
    //       this.currentCSSClass = 'snackbar warnShow';
    //       break;
    //     case 'Error' :
    //       this.currentCSSClass = 'snackbar errorShow';
    //       break;
    //     default:
    //       this.currentCSSClass = 'snackbar';
    //   }
    setTimeout(() => {
      console.log('Inside Timeout');
      this.currentCSSClass = 'snackbar';
    },3000);
    console.log('Outside Timeout');
    //this.currentCSSClass = 'snackbar';
    // switch(msg){
    //   case 'Success': this.currentCSSClass = 'snackbar successShow';
    // }
    console.log(this.currentCSSClass);
  }
  
  selectMsg(msg){
    this.selectedMsg = msg;
  }

}
