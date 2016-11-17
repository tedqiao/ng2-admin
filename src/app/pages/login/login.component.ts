import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../../core/authentication.service";
import {AuthService} from 'ng2-ui-auth';
import {Http} from "@angular/http";

interface Response {
  code: string;
  state: string;
}

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;


  constructor(fb: FormBuilder, private _auth: AuthenticationService, private auth: AuthService, private _http: Http) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this._auth.login(this.form.value.email, this.form.value.password).subscribe((data)=> {

      });
      // your code goes here
      // console.log(values);
    }
  }

  loginWithGoogle(social) {
    this.auth.authenticate(social)
      .map((res)=> {
        console.log(res);
        return res;
      })
      .flatMap((res: any)=> {
        return this._exchangeCode(social, res.code);
      })
      .subscribe((res)=> {
        console.log(res);
      });
  }

  private _exchangeCode(social, code) {
    return this._http.post('/oauth/token/' + social, {code: code,clientId:"mobileV1"}).map(res=>res.json());
  }

}
