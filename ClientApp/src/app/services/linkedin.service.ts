import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  private uri: string = 'http://localhost:59927/api/LinkedIn';
  private imageLocation: string = 'http://localhost:59927/Images';

  private postAddEditSubject = new BehaviorSubject<number>(null);
  public onPostAddEdit = this.postAddEditSubject.asObservable();

  private commentAddEditSubject = new BehaviorSubject<number>(null);
  public onCommentAddEdit = this.commentAddEditSubject.asObservable();

  constructor(private http: HttpClient) { }

  listPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.uri}/posts`);
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.uri}/posts/${postId}`);
  }

  addPost(postModel: Post, file:File) : Observable<number> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('postJson', JSON.stringify(postModel));

    return this.http.post<number>(`${this.uri}/posts`, formData);
  }

  updatePost(postId: number, postModel: Post, file:File) : Observable<void> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('postJson', JSON.stringify(postModel));

    return this.http.put<void>(`${this.uri}/posts/${postId}`, formData);
  }

  deletePost(postId: number) : Observable<void> {
    return this.http.delete<void>(`${this.uri}/posts/${postId}`);
  }

  likePost(postId: number): Observable<number> {
    return this.http.post<number>(`${this.uri}/posts/${postId}/like`, null);
  };

  listComments(postId): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.uri}/posts/${postId}/comments`);
  }

  getCommentById(postId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.uri}/posts/${postId}/comments/${commentId}`);
  }

  addComment(postId, commentModel: Comment) : Observable<number> {
    return this.http.post<number>(`${this.uri}/posts/${postId}/comments`, commentModel);
  }

  updateComment(postId: number, commentId: number, commentModel: Comment) : Observable<void> {
    return this.http.put<void>(`${this.uri}/posts/${postId}/comments/${commentId}`, commentModel);
  }

  deleteComment(postId: number, commentId: number) : Observable<void> {
    return this.http.delete<void>(`${this.uri}/posts/${postId}/comments/${commentId}`);
  }

  getImageLocation(fileName: string) {
    return `${this.imageLocation}/${fileName}`;
  }

  notifyPostAddEdit(postId: number) {
    this.postAddEditSubject.next(postId);
  }

  notifyCommentAddEdit(postId: number) {
    this.commentAddEditSubject.next(postId);
  }
}
