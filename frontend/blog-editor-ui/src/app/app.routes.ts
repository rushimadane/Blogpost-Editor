import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Blog Studio'
  },
  {
    path: 'create',
    component: CreateBlogComponent, // The new "Write Story" page
    title: 'New Story | Blog Studio'
  },
  {
    path: 'blogs',
    component: BlogPageComponent,
    title: 'Library | Blog Studio'
  },
  {
    path: 'blogs/:id',
    component: BlogDetailComponent,
    title: 'Read Story | Blog Studio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];