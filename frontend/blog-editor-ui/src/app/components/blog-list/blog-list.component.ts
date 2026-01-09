import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPostService, BlogPost } from '../../services/blog-post.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  posts: BlogPost[] = [];

  newPost: BlogPost = {
    title: '',
    content: '',
    author: ''
  };

  editingPostId: number | null = null;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogPostService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
  }

  addPost(): void {
    this.blogPostService.createPost(this.newPost).subscribe(() => {
      this.newPost = { title: '', content: '', author: '' };
      this.loadPosts();
    });
  }

  editPost(post: BlogPost): void {
    this.editingPostId = post.id!;
    this.newPost = { ...post };
  }

  updatePost(): void {
    if (this.editingPostId !== null) {
      this.blogPostService.updatePost(this.editingPostId, this.newPost)
        .subscribe(() => {
          this.editingPostId = null;
          this.newPost = { title: '', content: '', author: '' };
          this.loadPosts();
        });
    }
  }

  deletePost(id: number): void {
    this.blogPostService.deletePost(id).subscribe(() => {
      this.loadPosts();
    });
  }
}
