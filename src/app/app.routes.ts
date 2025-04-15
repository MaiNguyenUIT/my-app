import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PublicBlogFeedComponent } from './public-blog-feed/public-blog-feed.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blog/:id', component: BlogPostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserInfoComponent },
  { path: 'blog/edit/:id', component: EditBlogComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user/edit/:id', component: EditUserComponent },
  { path: 'blog-feed', component: PublicBlogFeedComponent },
  { path: '**', redirectTo: '' }
];


