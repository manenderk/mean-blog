import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private subscription: Subscription;
  private authStatusSub: Subscription;
  public isLoading = false;
  public totalPosts = 10;
  public postPerPage = 2;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];
  public userIsAuthenticated = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.subscription = this.postService.postUpdateListener().subscribe((postData: { posts: Post[], postCount: number}) => {
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
      this.isLoading = false;
    });
    /* this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }); */
    this.userIsAuthenticated = this.authService.getIsAuth();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }

  onDelete(id) {
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });
    this.isLoading = false;
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.isLoading = false;
  }

}
