import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './create-blog.component.html'
})
export class CreateBlogComponent {
  
  // Model for the new post
  post: BlogPost = {
    title: '',
    content: '',
    author: '',
    status: 'DRAFT',
    publishDate: new Date().toISOString().split('T')[0] // Default to today
  };

  isSubmitting = false;

  constructor(
    private blogService: BlogPostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(status: 'DRAFT' | 'PUBLISHED'): void {
    if (!this.post.title || !this.post.content || !this.post.author) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }

    this.isSubmitting = true;
    this.post.status = status;
    
    // Ensure date is set
    if (!this.post.publishDate) {
      this.post.publishDate = new Date().toISOString().split('T')[0];
    }

    this.blogService.createPost(this.post).subscribe({
      next: () => {
        this.showToast(status === 'PUBLISHED' ? 'Story published!' : 'Draft saved');
        // Redirect to the library after a short delay
        setTimeout(() => this.router.navigate(['/blogs']), 1000);
      },
      error: () => {
        this.showToast('Something went wrong. Please try again.', 'error');
        this.isSubmitting = false;
      }
    });
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