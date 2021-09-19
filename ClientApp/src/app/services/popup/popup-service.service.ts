import { Injectable } from '@angular/core';
import { PopupParam } from 'src/app/models/popup-param';
import { BehaviorSubject } from 'rxjs';
import { PopupType } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class PopupServiceService {

  private openPopupSubject = new BehaviorSubject<PopupParam>(null);
  public openPopup = this.openPopupSubject.asObservable();

  constructor() { }

  openAddPostForm() {
    const popupParam = new PopupParam();
    popupParam.popupType = PopupType.addPost;
    popupParam.data = null;
    this.openPopupSubject.next(popupParam);
  }

  openEditPostForm(postId: number) {
    const popupParam = new PopupParam();
    popupParam.popupType = PopupType.editPost;
    popupParam.data = {
      postId: postId
    };
    this.openPopupSubject.next(popupParam);
  }

  openAddCommentForm(postId: number) {
    const popupParam = new PopupParam();
    popupParam.popupType = PopupType.addComment;
    popupParam.data = {
      postId: postId
    };
    this.openPopupSubject.next(popupParam);
  }

  openEditCommentForm(postId: number, commentId: number) {
    const popupParam = new PopupParam();
    popupParam.popupType = PopupType.editComment;
    popupParam.data = {
      postId: postId,
      commentId: commentId
    };
    this.openPopupSubject.next(popupParam);
  }

}
