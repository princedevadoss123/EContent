import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';


const appRoutes: Routes = [
    {path: 'signup', component: RegistrationFormComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
