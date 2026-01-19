import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BlogFormComponent,
    BlogListComponent,
    MatSnackBarModule
  ],
  templateUrl: './blog-page.component.html'
})
export class BlogPageComponent implements OnInit {

  posts: BlogPost[] = [];
  editingPostId: number | null = null;

  // Sorting & filtering state
  sortBy: string = 'publishDate';
  sortDir: string = 'desc';
  filterType: string = '';
  filterValue: string = '';

  newPost: BlogPost = {
    title: '',
    content: '',
    author: '',
    status: 'DRAFT',
    publishDate: ''
  };

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

  addPost(): void {
    this.blogService.createPost(this.newPost).subscribe({
      next: () => {
        this.showToast('Post created successfully');
        this.resetForm();
        this.loadPosts();
      },
      error: () => this.showToast('Failed to create post', 'error')
    });
  }

  updatePost(): void {
    if (!this.editingPostId) return;

    this.blogService.updatePost(this.editingPostId, this.newPost)
      .subscribe({
        next: () => {
          this.showToast('Post updated successfully');
          this.resetForm();
          this.loadPosts();
        },
        error: () => this.showToast('Failed to update post', 'error')
      });
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id).subscribe({
      next: () => {
        this.showToast('Post deleted successfully');
        this.loadPosts();
      },
      error: () => this.showToast('Failed to delete post', 'error')
    });
  }

  editPost(post: BlogPost): void {
    this.editingPostId = post.id!;
    this.newPost = { ...post };
  }

  resetForm(): void {
    this.editingPostId = null;
    this.newPost = {
      title: '',
      content: '',
      author: '',
      status: 'DRAFT',
      publishDate: ''
    };
  }

  // 🔔 Central toast helper
  private showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['toast-success'] : ['toast-error']
    });
  }
}
