import { Routes } from '@angular/router';
import { SuserFormComponent } from './components/suser-form/suser-form.component';

export const routes: Routes = [
  {
    path: '',
    component: SuserFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
