import { Component, OnInit } from '@angular/core';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';
import { BlogFormComponent } from '../blog-form/blog-form.component';
import { BlogListComponent } from '../blog-list/blog-list.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [
    BlogFormComponent,
    BlogListComponent
  ],
  templateUrl: './blog-page.component.html'
})
export class BlogPageComponent implements OnInit {

  posts: BlogPost[] = [];
  editingPostId: number | null = null;

  newPost: BlogPost = {
    title: '',
    content: '',
    author: ''
  };

  constructor(private blogService: BlogPostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getAllPosts().subscribe({
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
    this.newPost = { title: '', content: '', author: '' };
  }
}
