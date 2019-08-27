import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  title = 'mean-blog';
  storedPosts: Post[] =  [];

  onPostAdded(post: Post) {
    this.storedPosts.push(post);
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
