import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css'
})
export class ImageCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() imageOnLeft: boolean = false;
}
