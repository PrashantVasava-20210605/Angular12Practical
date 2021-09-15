import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { LinkedinService } from 'src/app/services/linkedin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];

  private listPostSubscription: Subscription;
  private deletePostSubscription: Subscription;
  private likeSubscription: Subscription;

  public currentStage = 'list';
  private postToEdit: Post;

  constructor(
    private linkedinService: LinkedinService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.listPost();
    this.activatedRoute.data.subscribe((data: { posts: Post[] }) => {
      this.posts = data.posts;
    });
  }

  ngOnDestroy(): void {
    if (this.listPostSubscription) {
      this.listPostSubscription.unsubscribe();
    }
  }

  listPost() {
    this.listPostSubscription = this.linkedinService.listPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error("Error occured while fetching post list.", error);
      }
    );
  }

  

  deletePost(postId) {

    const procceed = window.confirm("Are you sure you want to delete the post?");
    if (!procceed) {
      return;
    }

    this.deletePostSubscription = this.linkedinService.deletePost(postId).subscribe(
      (response) => {
        this.listPost();
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

  addProduct() {
    this.currentStage = 'add';
  }

  resetListView() {
    this.currentStage = 'list';
  }

  refreshList() {
    this.currentStage = 'list';
    this.listPost();
  }

  editPost(post:Post) {
    this.currentStage = 'edit';
    this.postToEdit = post;
  }

}
