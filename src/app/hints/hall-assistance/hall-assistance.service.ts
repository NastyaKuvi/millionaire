import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AudioService } from '../../audio.service';

@Injectable()
export class HallAssistanceService {

  dataSet: Array<{ answer: string, color: string}>;
  activation$: BehaviorSubject<boolean>;

  constructor(
    private audioService: AudioService
  ) {
    this.dataSet = [{answer: 'A', color: '#da0000'},
                    {answer: 'B', color: '#07ce00'},
                    {answer: 'C', color: '#1cafb9'},
                    {answer: 'D', color: '#ff5e01'}];
    this.activation$ = new BehaviorSubject<boolean>(false);
   }

  getDataSet(): any {
    return this.dataSet;
  }

  show() {
    this.activation$.next(true);
    this.audioService.playHintHallAudio();
  }

  hide() {
    this.activation$.next(false);
    this.audioService.playMainAudio();
  }
}
