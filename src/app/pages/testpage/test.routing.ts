import { Routes, RouterModule }  from '@angular/router';
import {Test} from "./test.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Test,

  }
];

export const routing = RouterModule.forChild(routes);
