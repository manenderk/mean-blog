import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public form: FormGroup;
  private mode = 'create';
  private postId: string;
  public post: Post;
  public isLoading = false;
  public imagePreview: string;

  constructor(
    private postService: PostService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
        ],
      }),
      content: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
        ]
      }),
      image: new FormControl(null, {
        validators: [
          Validators.required
        ],
        /* asyncValidators: [
          mimeType
        ] */
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('postId') ) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: null
          };
          this.isLoading = false;
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createPost() {
    if ( this.form.valid ) {
      this.isLoading = true;
      if ( this.mode === 'create' ) {
        this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      } else if ( this.mode === 'edit' ) {
        this.post.title = this.form.value.title;
        this.post.content = this.form.value.content;
        this.postService.updatePost(this.post);
        this.post.title = '';
        this.post.content = '';
      }
      this.form.reset();
      this.isLoading = false;
      this.router.navigateByUrl('/');
    }
  }
}
