import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LinkedinService } from './services/linkedin.service';
import { HomeComponent } from './modules/home/home/home.component';
import { AddPostComponent } from './modules/home/home/add-post/add-post.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { EditPostComponent } from './modules/home/home/edit-post/edit-post.component';
import { ModalPopupComponent } from './modules/shared/modal-popup/modal-popup.component';
import { PopupServiceService } from './services/popup/popup-service.service';
import { NgbModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './modules/home/home/post/post.component';
import { AddCommentComponent } from './modules/home/home/add-comment/add-comment.component';
import { EditCommentComponent } from './modules/home/home/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPostComponent,
    ProfileComponent,
    EditPostComponent,
    ModalPopupComponent,
    PostComponent,
    AddCommentComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [LinkedinService, PopupServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
