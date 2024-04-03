import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LogoComponent } from "./components/logo/logo.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { TimerComponent } from "./components/timer/timer.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, TimerComponent, LogoComponent, NavbarComponent, TimerComponent]
})
export class AppComponent {

  constructor(private router: Router) {
  }
  isProblemPage() {
    // problems -> false | problem -> true
    let isProblemPage = this.router.url.match(/problem\/\d+/) ? true : false;
    return isProblemPage;
  }
  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.setBodyHeight();
    });
  }
  setBodyHeight() {
    if(this.router.url.match(/problem\/\d+/) || this.router.url.match(/login/) || this.router.url.match(/register/) || this.router.url.match(/forgot-password/)) {
      document.getElementById('body')?.style.setProperty('height', '100vh');
    } else {
      document.getElementById('body')?.style.setProperty('height', 'auto');
    }
  }
}
