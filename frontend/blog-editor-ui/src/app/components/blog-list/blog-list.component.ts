import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../services/blog-post.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent {

  @Input() posts: BlogPost[] = [];

  @Output() edit = new EventEmitter<BlogPost>();
  @Output() delete = new EventEmitter<number>();
}
