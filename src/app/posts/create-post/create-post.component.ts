import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  private post: Post;

  constructor(private postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('postId') ) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      }
      else {
        this.mode = 'create';
      }
    });
  }

  createPost(form: NgForm) {
    if ( form.valid ) {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }
}
