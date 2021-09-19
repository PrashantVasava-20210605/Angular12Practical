import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { LinkedinService } from 'src/app/services/linkedin.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() postId: number;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

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
    commentModel.content = this.commentForm.controls["content"].value;
    //postModel.imageBase64 = this.postImage;
    
    //console.log("MODEL", postModel);

    this.saveCommentSubscription = this.linkedinService.addComment(this.postId, commentModel).subscribe(
      (response) => {
        this.linkedinService.notifyCommentAddEdit(this.postId);
        this.onClose.emit(null);
        window.alert("Comment posted successfully.");
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


}
