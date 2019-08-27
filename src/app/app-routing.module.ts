import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: '', component: ListPostComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:postId', component: CreatePostComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
