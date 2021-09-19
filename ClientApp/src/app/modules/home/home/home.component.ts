import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { LinkedinService } from 'src/app/services/linkedin.service';
import { ActivatedRoute } from '@angular/router';
import { PopupServiceService } from 'src/app/services/popup/popup-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];

  private listPostSubscription: Subscription;
  private postAddEditSubscription: Subscription;

  constructor(
    public linkedinService: LinkedinService,
    private activatedRoute: ActivatedRoute,
    private popupService: PopupServiceService
  ) {}

  ngOnInit() {
    //this.listPost();
    this.activatedRoute.data.subscribe((data: { posts: Post[] }) => {
      this.posts = data.posts;
    });

    this.postAddEditSubscription = this.linkedinService.onPostAddEdit.subscribe(postId => 
    {
      if(!postId) {
        return;
      }
      this.listPost();
    });
  }

  ngOnDestroy(): void {
    if (this.listPostSubscription) {
      this.listPostSubscription.unsubscribe();
    }
    if (this.postAddEditSubscription) {
      this.postAddEditSubscription.unsubscribe();
    }
    this.linkedinService.notifyPostAddEdit(null);
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

  addProduct() {
    this.popupService.openAddPostForm();
  }

}
