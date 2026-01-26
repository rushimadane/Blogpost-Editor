import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishDate?: string;
  category?: string; // Added for trendy UI tags
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  // Update this URL if your backend port differs (e.g., 8080)
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  // 1. Get All Posts (with optional sorting/filtering)
  getAllPosts(sortBy?: string, sortDir: string = 'desc', filterType?: string, filterValue?: string): Observable<BlogPost[]> {
    let params = new HttpParams();
    
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortDir) params = params.set('sortDir', sortDir);
    if (filterType && filterValue) {
      params = params.set('filterType', filterType);
      params = params.set('filterValue', filterValue);
    }

    return this.http.get<BlogPost[]>(this.apiUrl, { params });
  }

  // 2. Get Single Post by ID (Required for the new View Page)
  getPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  // 3. Create Post
  createPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post);
  }

  // 4. Update Post
  updatePost(id: number, post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, post);
  }

  // 5. Delete Post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}