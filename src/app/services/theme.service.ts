import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  themes: string[] = ['lara-light-blue', 'lara-dark-blue'];
  // themes: string[] = ['lara-light-indigo', 'lara-dark-indigo'];
  // themes: string[] = ['lara-light-purple', 'lara-dark-purple'];
  // themes: string[] = ['bootstrap4-light-blue', 'bootstrap4-dark-blue'];
  // themes: string[] = ['md-dark-indigo', 'md-light-indigo'];
  // themes: string[] = ['soho-light', 'soho-dark'];
  
  constructor(@Inject(DOCUMENT) private document: Document) { 
    if(this.getThemeFromLocalStorage() === null){
      this.setThemeToLocalStorage(this.isPrefersDark() ? 'dark' : 'light');
    }
    if(this.getThemeFromLocalStorage() === 'dark')
      this.setThemeToDark(true);
    else
      this.setThemeToDark(false);
  }

  setTheme(theme: string) {
    let themeLink = document.getElementById("theme") as HTMLLinkElement;
    if (themeLink)
      themeLink.href = theme + ".css";
  }

  isPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setThemeToDark(checked: boolean) {
    this.setTheme(checked ? this.themes[1] : this.themes[0]);
    this.setThemeToLocalStorage(checked ? 'dark' : 'light');
  }

  getThemeFromLocalStorage() {  
    return localStorage.getItem('theme');
  }

  setThemeToLocalStorage(theme: string) {
    localStorage.setItem('theme', theme);
  }
}
