import { Component } from '@angular/core';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [ImageCardComponent, SkeletonModule]
})
export class LandingPageComponent {
    constructor() {
    }
}
