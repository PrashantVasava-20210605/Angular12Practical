import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { LinkedinService } from 'src/app/services/linkedin.service';


@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Input() postId: number;
  @Input() commentId: number;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  comment: Comment;

  private saveCommentSubscription: Subscription;

  commentForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder, private linkedinService: LinkedinService) { 
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]]
    });
  }

  public get contentControl(): AbstractControl {
    return this.commentForm.get('content');
  }


  ngOnInit() {
    this.getComment();
  }


  ngOnDestroy() {
    if (this.saveCommentSubscription) {
      this.saveCommentSubscription.unsubscribe();
    }
  }


  save() {
  
    this.submitted = true;

    if (this.commentForm.invalid) {
      this.findInvalidField();
      return;
    }
    
    const commentModel = new Comment();
    commentModel.id = this.commentId;
    commentModel.postId = this.postId;
    commentModel.content = this.commentForm.controls["content"].value;
    //postModel.imageBase64 = this.postImage;
    
    //console.log("MODEL", postModel);

    this.saveCommentSubscription = this.linkedinService.updateComment(this.postId, this.commentId, commentModel).subscribe(
      (response) => {
        this.linkedinService.notifyCommentAddEdit(this.postId);
        this.onClose.emit(null);
        window.alert("Comment updated successfully.");
      },
      (error) => {
        console.error("Error occured while posting comment.", error);
      }
    );
  }

  findInvalidField() {
  
    const invalid = [];
    const controls = this.commentForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    console.log("INVALID CONROLS", invalid);
  }

  getComment() {
    this.linkedinService.getCommentById(this.postId, this.commentId).subscribe(
      (response) => {
        this.comment = response;
        this.contentControl.setValue(this.comment.content);
      },
      (error) => {
        console.error("Error occured while fetching comment.", error);
      }
    );
  }
}
