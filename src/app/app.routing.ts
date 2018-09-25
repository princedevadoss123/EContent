import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LauncherComponent } from './launcher/launcher.component';


const appRoutes: Routes = [
    {path: 'launch', component: LauncherComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
