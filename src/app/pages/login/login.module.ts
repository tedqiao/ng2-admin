import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';

import {Login} from './login.component';
import {routing}       from './login.routing';
import {CoreModule} from "../../core/core.module";
import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import {IProviders} from "ng2-ui-auth/declerations/config.service";

export const GOOGLE_CLIENT_ID = '698746417760-t7ac2jmprhkpvrp4m3f1g8h410m08r4f.apps.googleusercontent.com';
export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers: { [provider: string]: IProviders } = {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      redirectUri: 'http://localhost:3000',
      url: null
    }
  };
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    CoreModule,
    routing,
    Ng2UiAuthModule.getWithConfig(MyAuthConfig)
  ],
  declarations: [
    Login
  ]
})
export default class LoginModule {
}
