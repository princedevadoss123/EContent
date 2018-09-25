import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { ValidationService} from './services/validation/validation.service';
import { HTTPClientService} from './services/HTTPClient/httpclient.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    ToastComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    ValidationService,
    HTTPClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
