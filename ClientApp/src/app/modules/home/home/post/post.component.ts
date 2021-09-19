import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { LinkedinService } from 'src/app/services/linkedin.service';
import { PopupServiceService } from 'src/app/services/popup/popup-service.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  
  commentList: Comment[] = null;

  private listPostSubscription: Subscription;
  private deletePostSubscription: Subscription;
  private likeSubscription: Subscription;
  private commentAddEditSubscription: Subscription;
  private deleteCommentSubscription: Subscription;

  public showComments: boolean = false;

  constructor(public linkedinService: LinkedinService, private popupService: PopupServiceService) { }

  ngOnInit() {
    this.commentAddEditSubscription = this.linkedinService.onCommentAddEdit.subscribe(postId => {
      if (this.post.id === postId) {
        this.listComments();
      }
    });
  }

  ngOnDestroy() {
    if (this.listPostSubscription) {
      this.listPostSubscription.unsubscribe();
    }
    if (this.deletePostSubscription) {
      this.deletePostSubscription.unsubscribe();
    }
    if (this.likeSubscription) {
      this.likeSubscription.unsubscribe();
    }
    if (this.commentAddEditSubscription) {
      this.commentAddEditSubscription.unsubscribe();
    }
    if (this.deleteCommentSubscription) {
      this.deleteCommentSubscription.unsubscribe();
    }
  }

  deletePost() {

    const procceed = window.confirm("Are you sure you want to delete the post?");
    if (!procceed) {
      return;
    }

    this.deletePostSubscription = this.linkedinService.deletePost(this.post.id).subscribe(
      (response) => {
        this.linkedinService.notifyPostAddEdit(this.post.id);
        window.alert("Post deleted successfully.");
      },
      (error) => {
        console.error("Error occured while deleting post.");
      }
    );
  }

  likePost() {

    this.likeSubscription = this.linkedinService.likePost(this.post.id).subscribe(
      (response) => {
        this.post.likeCount = this.post.likeCount + 1;
      },
      (error) => {
        console.error("Error occured while like the post.");
      }
    );
  }

  editPost() {
    this.popupService.openEditPostForm(this.post.id);
  }

  openComments() {
    this.showComments = !this.showComments;
    if(this.showComments && this.commentList == null) {
      this.listComments();
    }
  }

  listComments() {
    this.linkedinService.listComments(this.post.id).subscribe(response => {
      this.commentList = response;
      this.post.commentCount = this.commentList.length;
    });
  }

  addComment() {
    this.popupService.openAddCommentForm(this.post.id);
  }

  editComment(commentId: number) {
    this.popupService.openEditCommentForm(this.post.id, commentId);
  }

  deleteComment(commentId: number) {
    const procceed = window.confirm("Are you sure you want to delete the comment?");
    if (!procceed) {
      return;
    }

    this.deleteCommentSubscription = this.linkedinService.deleteComment(this.post.id, commentId).subscribe(
      (response) => {
        this.linkedinService.notifyCommentAddEdit(this.post.id);
        window.alert("Comment deleted successfully.");
      },
      (error) => {
        console.error("Error occured while deleting comment.");
      }
    );
  }
}
