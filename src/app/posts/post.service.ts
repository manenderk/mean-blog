import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    return this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts').
    pipe(map((postData) => {
      return postData.posts.map((post) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    })).
    subscribe((translatedPosts) => {
      this.posts = translatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  postUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const id = '';
    const post: Post = {
      id,
      title,
      content
    };
    this.httpClient.post<{message: string, id: string}>('http://localhost:3000/api/posts', post).subscribe((postData) => {
      post.id = postData.id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      const updatedPosts = this.posts.filter( (post) => post.id !== id);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.httpClient.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(post: Post) {
    const postData = {
      id: post.id,
      title: post.title,
      content: post.content
    };
    this.httpClient.put('http://localhost:3000/api/posts/' + postData.id, postData).subscribe((response) => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex( (p)  => p.id === postData.id);
      updatedPosts[oldPostIndex] = postData;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
