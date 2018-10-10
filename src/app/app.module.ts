import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './services/auth-api/auth-service.service';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../services/validation/validation.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LaunchFormComponent } from './launch-form/launch-form.component';
import { LauncherComponent } from './launcher/launcher.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    NavBarComponent,
    LaunchFormComponent,
    LauncherComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    ValidationService,
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
