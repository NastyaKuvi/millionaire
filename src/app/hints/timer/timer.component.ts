import { Component, OnInit, ElementRef } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(
    public element: ElementRef,
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
    this.element.nativeElement.classList.remove('used');
    this.timerService.resetTimer();
    this.getRemainingTime();
  }

  getRemainingTime() {
    return this.timerService.getCurrentTimer();
  }

  getIsStartAnimation() {
    return this.timerService.isTimerStarted();
  }

  getIsToHide() {
    return this.timerService.isTimerStopped();
  }
}
