import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ReactiveFormsModule
  ],
  providers: [
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
