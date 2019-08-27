import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
