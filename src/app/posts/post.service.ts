import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postCount = 0;
  private postUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    return this.httpClient
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map(postData => {
          return {
            post: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(translatedPostData => {
        this.posts = translatedPostData.post;
        this.postCount = translatedPostData.maxPosts;
        this.postUpdated.next({ posts: [...this.posts], postCount: this.postCount });
      });
  }

  postUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.httpClient
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe(response => {
        /* const post: Post = {
          id: response.post.id,
          title,
          content,
          imagePath: response.post.imagePath
        };
        this.posts.push(post);
        this.postCount++;
        this.postUpdated.next({posts: [...this.posts], postCount: this.postCount}); */
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.httpClient
      .delete('http://localhost:3000/api/posts/' + id)
      /* .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postCount--;
        this.postUpdated.next({ posts: [...this.posts], postCount: this.postCount });
      }) */;
  }

  getPost(id: string) {
    return this.httpClient.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id,
        title,
        content,
        imagePath: image
      };
    }

    this.httpClient
      .put<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts/' + id,
        postData
      )
      .subscribe(response => {
        /* const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id,
          title,
          content,
          imagePath: response.post.imagePath
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next({ posts: [...this.posts], postCount: this.postCount }); */
        this.router.navigate(['/']);
      });
  }
}
