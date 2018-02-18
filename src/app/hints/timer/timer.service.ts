import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AudioService } from '../../audio.service';

@Injectable()
export class TimerService {
  ticks: number;
  sub: Subscription;
  activation$: BehaviorSubject<boolean>;
  timerValue: string;
  timerStarted: boolean;
  timerStopped: boolean;
  constructor(
    private audioService: AudioService
  ) {
    this.resetTimer();
    this.activation$ = new BehaviorSubject<boolean>(false);
   }

  resetTimer() {
    this.ticks = 31;
    this.sub = null;
    this.timerValue = '30';
    this.timerStarted = false;
    this.timerStopped = false;
  }

  getCurrentTimer() {
    return this.timerValue;
  }

  isTimerStarted(): boolean {
    return this.timerStarted;
  }

  isTimerStopped(): boolean {
    return this.timerStopped;
  }

  startTimer() {
    this.activation$.next(true);

    this.audioService.playHintCallAudio();
    const timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(
      t => {
        this.timerStarted = true;
        this.timerStopped = false;
        this.ticks--;

        this.getRemainingTime();

        if (!this.ticks) {
          this.stopTimer();
        }
      }
    );
  }

  stopTimer() {
    this.timerStopped = true;
    this.timerStarted = false;
    this.sub.unsubscribe();
    this.audioService.playMainAudio();
    this.activation$.next(false);
  }

  getRemainingTime() {
    const secondsDisplay = this.getSeconds(this.ticks);
    this.timerValue = ((secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00');
  }

  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
  }
}
