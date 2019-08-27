import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGaurd } from './auth/auth.gaurd';


const routes: Routes = [
  { path: '', component: ListPostComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGaurd] },
  { path: 'edit/:postId', component: CreatePostComponent, canActivate: [AuthGaurd] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
