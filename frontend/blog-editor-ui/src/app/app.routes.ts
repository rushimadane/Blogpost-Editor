import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Blog Studio'
  },
  {
    path: 'blogs',
    component: BlogPageComponent,
    title: 'Manage Blogs | Blog Studio'
  },
  // Redirect unknown paths to home
  {
    path: '**',
    redirectTo: ''
  }
];