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
          id: post._id,
          imagePath: post.imagePath
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

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe((response) => {
      const post: Post = {
        id: response.post.id,
        title: title,
        content: content,
        imagePath: response.post.imagePath
      };
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
    return this.httpClient.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData : Post | FormData;
    if (typeof image === 'object'){
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }

    this.httpClient.put('http://localhost:3000/api/posts/' + id, postData).subscribe((response) => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex( (p)  => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ''//response.post.imagePath
      };
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
