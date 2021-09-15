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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPostComponent,
    ProfileComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LinkedinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
