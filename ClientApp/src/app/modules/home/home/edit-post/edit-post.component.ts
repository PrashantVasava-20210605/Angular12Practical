import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { LinkedinService } from 'src/app/services/linkedin.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post: Post;
  @Output() onClose = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();

  private savePostSubscription: Subscription;
  postForm: FormGroup;

  
  public get contentControl(): AbstractControl {
    return this.postForm.get('content');
  }
  
  
  constructor(private fb: FormBuilder, private linkedinService: LinkedinService) { 
    this.postForm = this.fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.contentControl.setValue(this.post.content);
  }

  ngOnDestroy() {
    if (this.savePostSubscription) {
      this.savePostSubscription.unsubscribe();
    }
  }

  closeForm() {
    this.onClose.emit(null);
  }

  save() {
  
    if (this.postForm.invalid) {
      //this.findInvalidField();
      return;
    }
    
    const postModel = new Post();
    postModel.id = this.post.id;
    postModel.content = this.postForm.controls["content"].value;
    
    this.savePostSubscription = this.linkedinService.updatePost(this.post.id, postModel).subscribe(
      (response) => {
        this.onSave.emit(null);
        window.alert("Post created successfully.");
      },
      (error) => {
        console.error("Error occured while creating post.", error);
      }
    );
  }

  findInvalidField() {
  
    const invalid = [];
    const controls = this.postForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    console.log("INVALID CONROLS", invalid);
  }

}
