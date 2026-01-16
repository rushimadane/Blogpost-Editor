import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  author: string;
  publishDate?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  // --- Updated getAllPosts to accept optional filter/sort params ---
  getAllPosts(sortBy?: string, sortDir?: string, filterType?: string, filterValue?: string): Observable<BlogPost[]> {
    let params: any = {};
    if (sortBy) params.sortBy = sortBy;
    if (sortDir) params.sortDir = sortDir;
    if (filterType) params.filterType = filterType;
    if (filterValue) params.filterValue = filterValue;

    return this.http.get<BlogPost[]>(this.apiUrl, { params });
  }

  createPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post);
  }

  updatePost(id: number, post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}