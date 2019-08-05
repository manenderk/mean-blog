import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {


  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  createPost(form: NgForm) {
    if ( form.valid ) {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }
}
