import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './blog-page.component.html'
})
export class BlogPageComponent implements OnInit {
  posts: BlogPost[] = [];
  
  // Sorting & filtering state
  sortBy: string = 'publishDate';
  sortDir: string = 'desc';
  filterType: string = '';
  filterValue: string = '';

  constructor(
    private blogService: BlogPostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    const fType = (this.filterType && this.filterValue) ? this.filterType : undefined;
    const fValue = (this.filterType && this.filterValue) ? this.filterValue : undefined;

    this.blogService.getAllPosts(this.sortBy, this.sortDir, fType, fValue)
      .subscribe({
        next: (data) => this.posts = data,
        error: () => this.showToast('Failed to load posts', 'error')
      });
  }

  deletePost(id: number, event: Event): void {
    // Prevent the card click event (which opens the blog) from firing
    event.stopPropagation();
    
    if(confirm('Are you sure you want to delete this story? This cannot be undone.')) {
      this.blogService.deletePost(id).subscribe({
        next: () => {
          this.showToast('Post deleted successfully');
          this.loadPosts();
        },
        error: () => this.showToast('Failed to delete post', 'error')
      });
    }
  }

  private showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['toast-success'] : ['toast-error']
    });
  }
}