import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogPostService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the URL (e.g., /blog/1)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.blogService.getPostById(+id).subscribe({
        next: (data) => {
          this.post = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }
}