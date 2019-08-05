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

  /* posts = [
    {title: 'First Post', content: 'This is the first post\'s content'},
    {title: 'Second Post', content: 'This is the second post\'s content'},
    {title: 'Third Post', content: 'This is the third post\'s content'},
  ] */


  posts: Post[] = [];
  private subscription: Subscription;
  constructor(private postService: PostService) { }

  ngOnInit() {
    // this.subscription = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => this.posts = posts);
    this.posts = this.postService.getPosts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
