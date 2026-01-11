import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog-form.component.html'
})
export class BlogFormComponent {

  @Input() newPost: any;
  @Input() editingPostId: number | null = null;

  @Output() add = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();

  submit() {
    this.editingPostId ? this.update.emit() : this.add.emit();
  }
}
