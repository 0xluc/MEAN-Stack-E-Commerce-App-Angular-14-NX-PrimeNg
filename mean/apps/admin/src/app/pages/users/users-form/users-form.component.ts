import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../../../../../libs/products/src/lib/models/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@mean/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Component({
  selector: 'mean-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit{
  editMode = false
  countries:any[]=[]
  form: FormGroup
  currentUserId:number

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        isAdmin: [false],
        phone: ['', Validators.required],
        city: ['', ],
        country: ['', ],
        street: ['', ],
        zip: ['', ],
        apartment: ['', ],
        password: ['', Validators.required]
      })
      this._getCountries()
      this._checkEditMode()
  }
  onSubmit(){
    if(this.form.invalid) {
      return;
    }
    const user: any= {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      isAdmin: this.userForm.isAdmin.value,
      phone: this.userForm.phone.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      street: this.userForm.street.value,
      zip: this.userForm.zip.value,
      apartment: this.userForm.apartment.value,
      password: this.userForm.password.value
    }
    if(!this.editMode){
      this._addUser(user)
    }
    else {
      user.id = this.currentUserId
      this._editUser(user)
    }
  }
  public get userForm(): any{
    return this.form.controls
  }
  private _getCountries(){
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map((country) => {
      return {
        id: country[0],
        name: country[1]
      }
    })
  }
  private _addUser(user: User){
    this.usersService.createUser(user).subscribe(() => {
      this.form.reset()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Created',
      })
      this.router.navigate(['/users'])
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      })
    })
  }
  private _editUser(user: User){
    this.usersService.updateUser(user).subscribe(() => {
      this.form.reset()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Updated',
      })
      this.router.navigate(['/users'])
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error,
      })
    })
  }
  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editMode = true
        this.currentUserId = params['id']
        this.usersService.getUser(String(this.currentUserId)).subscribe(user => {
          this.userForm.name.setValue(user.name)
          this.userForm.email.setValue(user.email)
          this.userForm.isAdmin.setValue(user.isAdmin)
          this.userForm.phone.setValue(user.phone)
          this.userForm.city.setValue(user.city)
          this.userForm.country.setValue(user.country)
          this.userForm.street.setValue(user.street)
          this.userForm.zip.setValue(user.zip)
          this.userForm.apartment.setValue(user.apartment)
          this.userForm.password.setValidators([])
          this.userForm.password.updateValueAndValidity()
        })
      }
    })
  }
}
