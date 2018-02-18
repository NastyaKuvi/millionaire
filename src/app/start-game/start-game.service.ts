import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AudioService } from '../audio.service';

var game1 = require('../resource/game1.json');
var game2 = require('../resource/game2.json');
var game3 = require('../resource/game3.json');
var game4 = require('../resource/game4.json');

@Injectable()
export class StartGameService {

  game$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(
    private audioService: AudioService
  ) { }

  setGame(curGame: any) {
    this.game$.next(curGame);
  }

  startGame(num: string): any {
    switch (num) {
      case '1': {
        this.setGame(game1);
        break;
      }
      case '2': {
        this.setGame(game2);
        break;
      }
      case '3': {
        this.setGame(game3);
        break;
      }
      case '4': {
        this.setGame(game4);
        break;
      }
    }
    this.audioService.playMainFirstAudio();
  }
}
