import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './create-blog.component.html'
})
export class CreateBlogComponent implements OnInit {
  
  post: BlogPost = {
    title: '',
    content: '',
    author: '',
    status: 'DRAFT',
    publishDate: new Date().toISOString().split('T')[0]
  };

  isSubmitting = false;
  isEditMode = false;
  postId?: number;

  constructor(
    private blogService: BlogPostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Check if we are in "Edit Mode"
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.postId = +id;
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number): void {
    this.blogService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        // Ensure date format is compatible with input[type="date"] (yyyy-MM-dd)
        if (this.post.publishDate && Array.isArray(this.post.publishDate)) {
           // Handle Java LocalDate array [yyyy, MM, dd] if necessary
           const d = this.post.publishDate as any;
           this.post.publishDate = `${d[0]}-${String(d[1]).padStart(2, '0')}-${String(d[2]).padStart(2, '0')}`;
        }
      },
      error: () => {
        this.showToast('Failed to load story', 'error');
        this.router.navigate(['/blogs']);
      }
    });
  }

  onSubmit(status: 'DRAFT' | 'PUBLISHED'): void {
    if (!this.post.title || !this.post.content || !this.post.author) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }

    this.isSubmitting = true;
    this.post.status = status;

    const request = this.isEditMode && this.postId
      ? this.blogService.updatePost(this.postId, this.post)
      : this.blogService.createPost(this.post);

    request.subscribe({
      next: () => {
        this.showToast(this.isEditMode ? 'Story updated!' : (status === 'PUBLISHED' ? 'Story published!' : 'Draft saved'));
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