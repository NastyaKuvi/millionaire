import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
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
