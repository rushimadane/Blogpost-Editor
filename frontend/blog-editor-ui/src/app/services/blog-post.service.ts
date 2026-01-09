import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
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
