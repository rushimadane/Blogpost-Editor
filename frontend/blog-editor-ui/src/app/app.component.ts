import { Component } from '@angular/core';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlogListComponent],
  template: `<app-blog-list></app-blog-list>`
})
export class AppComponent {}

