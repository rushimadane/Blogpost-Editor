import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
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

  constructor(private blogService: BlogPostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Updated to include sort/filter params
  loadPosts(): void {
    // Only send filter params if both type and value are present
    const fType = (this.filterType && this.filterValue) ? this.filterType : undefined;
    const fValue = (this.filterType && this.filterValue) ? this.filterValue : undefined;

    this.blogService.getAllPosts(this.sortBy, this.sortDir, fType, fValue)
      .subscribe({
        next: (data) => this.posts = data,
        error: (err) => console.error(err)
      });
  }

  addPost(): void {
    this.blogService.createPost(this.newPost).subscribe(() => {
      this.resetForm();
      this.loadPosts();
    });
  }

  updatePost(): void {
    if (!this.editingPostId) return;

    this.blogService.updatePost(this.editingPostId, this.newPost)
      .subscribe(() => {
        this.resetForm();
        this.loadPosts();
      });
  }

  editPost(post: BlogPost): void {
    this.editingPostId = post.id!;
    this.newPost = { ...post };
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id).subscribe(() => {
      this.loadPosts();
    });
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
}