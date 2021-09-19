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

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  
  private savePostSubscription: Subscription;

  postForm: FormGroup;
  submitted: boolean;
  postImage: string;
  attachment: File = null;
  
 
  
  
  constructor(private fb: FormBuilder, private linkedinService: LinkedinService) { 
    this.postForm = this.fb.group({
      content: ['', [Validators.required]],
      uploadImage: [null]
    });
  }

  public get contentControl(): AbstractControl {
    return this.postForm.get('content');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.savePostSubscription) {
      this.savePostSubscription.unsubscribe();
    }
  }


  save() {
  
    this.submitted = true;

    if (this.postForm.invalid) {
      this.findInvalidField();
      return;
    }
    
    const postModel = new Post();
    postModel.content = this.postForm.controls["content"].value;
    //postModel.imageBase64 = this.postImage;
    
    //console.log("MODEL", postModel);

    this.savePostSubscription = this.linkedinService.addPost(postModel, this.attachment).subscribe(
      (response) => {
        this.linkedinService.notifyPostAddEdit(response);
        this.onClose.emit(null);
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

  setFile(event) {

    const fileControl = event.target as HTMLInputElement;
    if (!fileControl || !fileControl.files || fileControl.files.length<=0) {
      return;
    }

    this.attachment = fileControl.files[0];
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.postImage = reader.result as string;
    }
    reader.readAsDataURL(this.attachment);
  }

  openFileUpload() {
    const element = document.getElementById('uploadImage') as HTMLInputElement;
    element.value = '';
    element.click();
  }

  removeFile() {
    this.attachment = null;
    this.postImage = null;
  }
}
