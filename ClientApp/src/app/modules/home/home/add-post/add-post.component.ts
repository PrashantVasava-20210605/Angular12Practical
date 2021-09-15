import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { LinkedinService } from 'src/app/services/linkedin.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {
  
  private savePostSubscription: Subscription;

  @Output() onClose = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();

  postForm: FormGroup;
  submitted: boolean;
  postImage: string;
  
  public get contentControl(): AbstractControl {
    return this.postForm.get('content');
  }
  
  
  constructor(private fb: FormBuilder, private linkedinService: LinkedinService) { 
    this.postForm = this.fb.group({
      content: ['', [Validators.required]],
      uploadImage: [null]
    });
  }

  ngOnInit() {

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
  
    this.submitted = true;

    if (this.postForm.invalid) {
      this.findInvalidField();
      return;
    }
    
    const postModel = new Post();
    postModel.content = this.postForm.controls["content"].value;
    postModel.imageBase64 = this.postImage;
    
    //console.log("MODEL", postModel);

    this.savePostSubscription = this.linkedinService.addPost(postModel).subscribe(
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

  uploadFile(event) {

    const fileControl = event.target as HTMLInputElement;
    if (!fileControl || !fileControl.files || fileControl.files.length<=0) {
      return;
    }

    const file = fileControl.files[0];
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.postImage = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
