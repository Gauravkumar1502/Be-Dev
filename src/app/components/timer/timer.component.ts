import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  timeInMSx10:number = 0;
  isPaused:Boolean = true;
  timerInterval:any;

  hh:number = 0;
  mm:number = 0;
  ss:number = 0;

  constructor() {
  }

  toggState() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  resetTimer() {
    this.timeInMSx10 = 0;
    this.isPaused = true;
    this.stopTimer();
    this.hh = this.mm = this.ss = 0;
  }

  startTimer() {
    // use setInterval to increment the timer and display it
    this.timerInterval = setInterval(() => {
      this.timeInMSx10++;
      if (this.timeInMSx10 === 100) {
        this.timeInMSx10 = 0;
        this.ss++;
      }
      if (this.ss === 60) {
        this.ss = 0;
        this.mm++;
      }
      if (this.mm === 60) {
        this.mm = 0;
        this.hh++;
      }
    }, 10);
  }

  stopTimer() {
    // use clearInterval to stop the timer
    clearInterval(this.timerInterval);
  }

  formatTimeInHours() {
    let formattedTime = '';
    if (this.hh > 0) {
      formattedTime += this.padZero(this.hh) + ':';
    }
    if (this.mm > 0) {
      formattedTime += this.padZero(this.mm) + ':';
    }
    formattedTime += this.padZero(this.ss);
    formattedTime += '.' + this.padZero(this.timeInMSx10);
    return formattedTime;
  }

  padZero(num:number) {
    return num < 10 ? '0' + num : num;
  }
  
  ngOnDestroy() {
    this.stopTimer();
  }
}
