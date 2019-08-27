import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
  public totalPosts = 10;
  public postPerPage = 2;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.subscription = this.postService.postUpdateListener().subscribe((postData) => {
      this.posts = postData.posts;
      this.isLoading = false;
      this.totalPosts = postData.postCount;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id) {
    this.postService.deletePost(id);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.isLoading = false;
  }

}
