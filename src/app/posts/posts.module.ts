import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from './post.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    CreatePostComponent,
    ListPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    PostService
  ],
  exports: [
    CreatePostComponent,
    ListPostComponent
  ]
})
export class PostsModule { }
