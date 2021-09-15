import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  private uri: string = 'http://localhost:59927/api/LinkedIn';

  constructor(private http: HttpClient) { }

  listPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.uri}/posts`);
  }

  addPost(postModel: Post) : Observable<number> {
    return this.http.post<number>(`${this.uri}/posts`, postModel);
  }

  updatePost(postId: number, postModel: Post) : Observable<void> {
    return this.http.put<void>(`${this.uri}/posts/${postId}`, postModel);
  }

  deletePost(postId: number) : Observable<void> {
    return this.http.delete<void>(`${this.uri}/posts/${postId}`);
  }

  likePost(postId: number): Observable<number> {
    return this.http.post<number>(`${this.uri}/posts/${postId}/like`, null);
  };

  addComment(postId, commentModel: Comment) : Observable<number> {
    return this.http.post<number>(`${this.uri}/posts/${postId}/comments`, commentModel);
  }

  updateComment(postId: number, commentId: number, commentModel: Post) : Observable<void> {
    return this.http.put<void>(`${this.uri}/posts/${postId}/comments/${commentId}`, commentModel);
  }

  deleteComment(postId: number, commentId: number) : Observable<void> {
    return this.http.delete<void>(`${this.uri}/posts/${postId}/comments/${commentId}`);
  }

}
