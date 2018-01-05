import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  beforeStart: any;
  main1: any;
  main2: any;
  answered: any;
  right: any;
  wrong: any;
  winner: any;
  hintHall: any;
  hintCall: any;

  firstMain: boolean;

  constructor() { }

  initAudioService() {
    this.beforeStart = document.getElementById("audio-before-start");
    this.beforeStart.play();
    this.main1 = document.getElementById("audio-main1");
    this.main2 = document.getElementById("audio-main2");
    this.answered = document.getElementById("audio-answered");
    this.right = document.getElementById("audio-right");
    this.wrong = document.getElementById("audio-wrong");
    this.winner = document.getElementById("audio-winner");
    this.hintHall = document.getElementById("audio-hint-hall");
    this.hintCall = document.getElementById("audio-hint-call");
    this.firstMain = true;
  }

  stopAllAudio() {
    this.stopAudio(this.beforeStart);
    this.stopAudio(this.main1);
    this.stopAudio(this.main2);
    this.stopAudio(this.answered);
    this.stopAudio(this.right);
    this.stopAudio(this.wrong);
    this.stopAudio(this.winner);
    this.stopAudio(this.hintHall);
    this.stopAudio(this.hintCall);
  }

  stopAudio(audio: any) {
    if (typeof(audio) == "undefined") {
      return;
    }
    audio.pause();
    audio.currentTime = 0;
  }

  playBeforeStartAudio() {
    if (typeof(this.beforeStart) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.beforeStart.play();
  }

  playMainAudio() {
    if (this.firstMain) {
      this.playMainFirstAudio();
    }
    else {
      this.playMainSecondAudio();
    }
  }

  playMainFirstAudio() {
    if (typeof(this.main1) == "undefined") {
      return;
    }
    this.firstMain = true;
    this.stopAllAudio();
    this.main1.play();
  }

  playMainSecondAudio() {
    if (typeof(this.main2) == "undefined") {
      return;
    }
    this.firstMain = false;
    this.stopAllAudio();
    this.main2.play();
  }

  playAnsweredAudio() {
    if (typeof(this.answered) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.answered.play();
  }

  playRightAnswerAudio() {
    if (typeof(this.right) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.right.play();
  }

  playWrongAnswerAudio() {
    if (typeof(this.wrong) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.wrong.play();
  }

  playWinnerAudio() {
    if (typeof(this.winner) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.winner.play();
  }

  playHintHallAudio() {
    if (typeof(this.hintHall) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.hintHall.play();
  }

  playHintCallAudio() {
    if (typeof(this.hintCall) == "undefined") {
      return;
    }
    this.stopAllAudio();
    this.hintCall.play();
  }
}
