import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { LinkedinService } from 'src/app/services/linkedin.service';
import { PopupServiceService } from 'src/app/services/popup/popup-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  
  private listPostSubscription: Subscription;
  private deletePostSubscription: Subscription;
  private likeSubscription: Subscription;

  constructor(public linkedinService: LinkedinService, private popupService: PopupServiceService) { }

  ngOnInit() {
  }

  deletePost(postId) {

    const procceed = window.confirm("Are you sure you want to delete the post?");
    if (!procceed) {
      return;
    }

    this.deletePostSubscription = this.linkedinService.deletePost(postId).subscribe(
      (response) => {
        this.linkedinService.notifyPostAddEdit(postId);
        window.alert("Post deleted successfully.");
      },
      (error) => {
        console.error("Error occured while deleting post.");
      }
    );
  }

  likePost(post: Post) {

    this.likeSubscription = this.linkedinService.likePost(post.id).subscribe(
      (response) => {
        post.likeCount = post.likeCount + 1;
      },
      (error) => {
        console.error("Error occured while like the post.");
      }
    );
  }

  editPost(id: number) {
    this.popupService.openEditPostForm(id);
  }

}
