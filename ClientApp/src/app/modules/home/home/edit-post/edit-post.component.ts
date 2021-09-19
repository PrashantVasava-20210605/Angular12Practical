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

  @Input() postId: number;
  @Output() onClose = new EventEmitter<any>();
  
  private savePostSubscription: Subscription;
  private getPostByIdSubscription: Subscription;

  post: Post = new Post();

  postForm: FormGroup;
  submitted: boolean;
  postImage: string;
  attachment: File = null;
  
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
    this.getPostById();
  }

  ngOnDestroy() {
    if (this.savePostSubscription) {
      this.savePostSubscription.unsubscribe();
    }
    if (this.getPostByIdSubscription) {
      this.getPostByIdSubscription.unsubscribe();
    }
  }


  save() {
  
    this.submitted = true;

    if (this.postForm.invalid) {
      this.findInvalidField();
      return;
    }
    
    const postModel = new Post();
    postModel.id = this.post.id;
    postModel.content = this.postForm.controls["content"].value;
    postModel.imageFileName = this.post.imageFileName;
    
    this.savePostSubscription = this.linkedinService.updatePost(this.postId, postModel, this.attachment).subscribe(
      (response) => {
        this.linkedinService.notifyPostAddEdit(this.postId);
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
    this.post.imageFileName = null;
    
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
    this.post.imageFileName = null;
  }

  getPostById() {
    this.getPostByIdSubscription = this.linkedinService.getPostById(this.postId).subscribe(
      (response) => {
        this.post = response;
        this.contentControl.setValue(this.post.content);
        if (this.post.imageFileName && this.post.imageFileName!=='') {
          this.postImage = this.linkedinService.getImageLocation(this.post.imageFileName);
        }
      },
      (error) => {
        console.error("Error occured while fetching post record.", error);
      }
    );
  }
}
