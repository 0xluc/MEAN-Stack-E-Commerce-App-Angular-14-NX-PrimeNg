import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup
  authMessage: string

  constructor(
    private formBuilder:FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm()
  }

  onSubmit(){
    const loginData = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value
    }
    this.auth.login(loginData.email, loginData.password).subscribe((res:any)=> {
      this.localStorageService.setToken(res.token)
      this.router.navigate(['/'])
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if(err.status !== 404){
        this.authMessage = "Server error"
      }
      else{
        this.authMessage = "Email or password is incorrect"
      }
     this.messageService.add({
       severity: 'error',
       summary: this.authMessage,
       detail: err.error.error
     })
    })
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls
  }

}
