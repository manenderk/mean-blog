import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private subscription: Subscription;
  constructor(private postService: PostService) { }
  public isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.subscription = this.postService.postUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id) {
    this.postService.deletePost(id);
  }

}
