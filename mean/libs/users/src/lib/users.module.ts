import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  Route } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes), RouterModule, InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LoginComponent
  ],
})
export class UsersModule {}
