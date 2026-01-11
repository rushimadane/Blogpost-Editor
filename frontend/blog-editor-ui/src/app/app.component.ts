import { Component } from '@angular/core';
import { BlogPageComponent } from './components/blog-page/blog-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlogPageComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
