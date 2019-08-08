import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  public post: Post;
  public isLoading = false;

  constructor(private postService: PostService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('postId') ) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  createPost(form: NgForm) {
    if ( form.valid ) {
      this.isLoading = true;
      if ( this.mode === 'create' ) {
        this.postService.addPost(form.value.title, form.value.content);
      } else if ( this.mode === 'edit' ) {
        this.post.title = form.value.title;
        this.post.content = form.value.content;
        this.postService.updatePost(this.post);
        this.post.title = '';
        this.post.content = '';
      }
      form.resetForm();
      this.isLoading = false;
      this.router.navigateByUrl('/');
    }
  }
}
