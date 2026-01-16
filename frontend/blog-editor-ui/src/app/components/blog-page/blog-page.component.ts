import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar'; // <--- Import Material Snackbar

import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,  
    BlogFormComponent,
    BlogListComponent
  ],
  templateUrl: './blog-page.component.html'
})
export class BlogPageComponent implements OnInit {

  posts: BlogPost[] = [];
  editingPostId: number | null = null;

  // --- Filtering & Sorting State ---
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

  // Inject MatSnackBar
  constructor(
    private blogService: BlogPostService,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // --- Load Posts with Sort & Filter Params ---
  loadPosts(): void {
    const fType = (this.filterType && this.filterValue) ? this.filterType : undefined;
    const fValue = (this.filterType && this.filterValue) ? this.filterValue : undefined;

    this.blogService.getAllPosts(this.sortBy, this.sortDir, fType, fValue)
      .subscribe({
        next: (data) => this.posts = data,
        error: (err) => {
          console.error(err);
          this.showToast('Failed to load posts', 'Retry');
        }
      });
  }

  // --- CREATE ---
  addPost(): void {
    this.blogService.createPost(this.newPost).subscribe({
      next: () => {
        this.showToast('Post created successfully!');
        this.resetForm();
        this.loadPosts();
      },
      error: () => this.showToast('Error creating post', 'Close')
    });
  }

  // --- UPDATE ---
  updatePost(): void {
    if (!this.editingPostId) return;

    this.blogService.updatePost(this.editingPostId, this.newPost)
      .subscribe({
        next: () => {
          this.showToast('Post updated successfully!');
          this.resetForm();
          this.loadPosts();
        },
        error: () => this.showToast('Error updating post', 'Close')
      });
  }

  // --- DELETE ---
  deletePost(id: number): void {
    // Optional: Add a confirmation dialog here if you want later
    this.blogService.deletePost(id).subscribe({
      next: () => {
        this.showToast('Post deleted', 'Undo');
        this.loadPosts();
      },
      error: () => this.showToast('Error deleting post', 'Close')
    });
  }

  // --- EDIT TRIGGER ---
  editPost(post: BlogPost): void {
    this.editingPostId = post.id!;
    // Create a copy so we don't edit the list item directly until saved
    this.newPost = { ...post };
    
    // Scroll to top for better UX (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- HELPER: RESET FORM ---
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

  // --- HELPER: SHOW TOAST ---
  private showToast(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }
}