import { Routes } from '@angular/router';
import { UserFormComponent } from './components/suser-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UserFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
