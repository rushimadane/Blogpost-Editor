import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import the HeaderComponent we just fixed
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}