import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { PostListResolverService } from './Resolvers/post-list-resolver.service';


const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    resolve: { 
      posts: PostListResolverService 
    }
  },
  {
    path: 'Profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
