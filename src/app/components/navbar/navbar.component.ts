import { Component } from '@angular/core';
import { InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';
import { ThemeService } from '../../services/theme.service';
import { LogoComponent } from "../logo/logo.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [FormsModule, RouterLink, InputSwitchModule, LogoComponent]
})
export class NavbarComponent {
  checked: boolean = false;
  constructor(private themeService: ThemeService) {
    this.checked = this.themeService.getThemeFromLocalStorage() === 'dark';
    this.themeService.setThemeToDark(this.checked);
  }

  switchTheme($event: InputSwitchChangeEvent) {
      this.themeService.setThemeToDark($event.checked);
  }
}
