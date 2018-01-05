import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription, Observable } from 'rxjs';
import { AudioService } from '../../audio.service';

@Injectable()
export class TimerService {
  ticks = 31;
  sub: Subscription;
  someEvent = new Subject();
  timerValue: string = '30';
  timerStarted: boolean = false;
  timerStopped: boolean = false;
  constructor(
    private audioService: AudioService
  ) {
   }

   getCurrentTimer() {
     return this.timerValue;
   }

   isTimerStarted() : boolean {
     return this.timerStarted;
   }
   isTimerStopped() : boolean {
     return this.timerStopped;
   }

   startTimer() {
     this.audioService.playHintCallAudio();
     let timer = Observable.timer(1, 1000);
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
  }

  getRemainingTime() {
    let secondsDisplay = this.getSeconds(this.ticks);
    this.timerValue = ((secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00');
  }

  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private pad(digit: any) { 
      return digit <= 9 ? '0' + digit : digit;
  }
}
