import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import {Http} from '@angular/http';
import { element } from 'protractor';
import { TimerService } from './hints/timer/timer.service';
import { HallAssistanceService } from './hints/hall-assistance/hall-assistance.service';
import { StartGameService } from './start-game/start-game.service';

export class QuestionGroup {
  num: number;
  question: string;
  answer1: string;
  answer2:string;
  answer3:string;
  answer4:string;
  rightAnswer: number;
  constructor() {
    this.num = 0;
    this.question = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.rightAnswer = 0;
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  title: string;
  questionGroup: QuestionGroup;
  prizes = [];
  currSelectedAnswer: number;
  canContinue: boolean;
  canCheck: boolean;
  earnedPrize: string;
  fireProofPrizes: any;
  isToShowGameOverForm: boolean;
  IsTimerToShow: boolean;
  IsHallToShow: boolean;
  isTimeToPlay: boolean;

  game: any = {};

  constructor(
    private timer: TimerService,
    private hallService: HallAssistanceService,
    private startService: StartGameService
  ) {
    this.startService.game$.subscribe((game)=> {
      if(Object.keys(game).length == 0) {
        return;
      }
      this.title = game.title;
      this.prizes = game.prizes;
      this.earnedPrize = this.prizes[this.prizes.length - 1];
      this.isTimeToPlay = true;
      this.setNextQuestionGroup(game.questions[0], 1);
      this.game = game;
      this.canContinue = false;

      let hints = document.getElementsByClassName("hint");
      for(let i = 0; i < hints.length; i++) {
        hints[i].classList.remove("used");
      }
    })
    this.questionGroup = new QuestionGroup();
    this.currSelectedAnswer = 0;
    this.canContinue = false;
    this.canCheck = false;
    this.fireProofPrizes = [1, 6, 11, 14];
    this.isToShowGameOverForm = false;
    this.IsTimerToShow = false;
    this.IsHallToShow = false;
    this.isTimeToPlay = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if(!this.isTimeToPlay) {
      return;
    }

    console.log(event.key + "in app mode");
    switch(event.key) {
      case "1":
      case "2":
      case "3":
      case "4": {
        if (!this.isToShowGameOverForm) {
          this.selectAnswer(event.key);
        }
        break;
      }
      case "Enter": {
        if (!this.isToShowGameOverForm) {
          this.checkAnswer();
        }
        break;
      }

      case "5": {
        if (!this.isToShowGameOverForm) {
          let hint = document.getElementsByClassName("hint")[0];
          if(!hint.classList.contains("used")) {
            hint.classList.add("selected");
            this.callHalfHint();
            hint.classList.add("used");
            hint.classList.remove("selected");
          }
        }
        break;
      }
      case "6": {
        if (!this.isToShowGameOverForm) {
          let hint = document.getElementsByClassName("hint")[1];
          if(!hint.classList.contains("used")) {
            this.callPeopleHint();
            hint.classList.add("used");
          }
        }
        break;
      }
      case "7": {
        if (!this.isToShowGameOverForm) {
          let hint = document.getElementsByClassName("hint")[2];
          if(!hint.classList.contains("used")) {
            this.callRingHint();
            hint.classList.add("used");
          }
        }
        break;
      }
      case " ": {
        this.isToShowGameOverForm = false;
        this.isTimeToPlay = false;
      }
    }
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  callHalfHint() {
    let answerElems = document.getElementsByClassName("answer-container");
    let a = [1,2,3,4];
    a.splice(this.questionGroup.rightAnswer - 1, 1);
    let r = this.randomInteger(0,2);
    answerElems[a[r] - 1].classList.add("hidden");
    let temp = a[0];
    a[0] = a[r];
    a[r] = temp;

    r = this.randomInteger(1,2);
    answerElems[a[r] - 1].classList.add("hidden");
  }

  callPeopleHint() {
    this.IsHallToShow = true;
  }

  callRingHint() {
    this.IsTimerToShow = true;
  }

  goToTheNextQuestion() {
    if (this.questionGroup.num == 14) {
      this.earnedPrize = this.prizes[0];
      this.gameOver(true);
    }
    else if (this.canContinue) {
      this.setNextQuestionGroup(this.game.questions[this.questionGroup.num], this.questionGroup.num + 1);
      this.canContinue = false;
    }
  }

  getIsCurrentPrize(prize: any) {
    let curIndex = this.prizes.length - this.questionGroup.num;

    if (this.questionGroup.num == 7 || this.questionGroup.num == 12) {
      this.earnedPrize = this.prizes[curIndex + 1];
    }
    return prize == this.prizes[curIndex];
  }

  setNextQuestionGroup(group: any, qNum: number) {
    let elemClass = "answer";
    let elements = document.getElementsByClassName(elemClass);
    for(let i = 0; i < elements.length; i++) {
      let elem = elements[i];
      elem.classList.remove('selected');
      elem.classList.remove('right');
      elem.classList.remove('wrong');
      elem.getElementsByClassName("answer-container")[0].classList.remove('hidden');
    }

    this.questionGroup.num = qNum;
    this.questionGroup.question = group.question;
    this.questionGroup.answer1 = group.answer1;
    this.questionGroup.answer2 = group.answer2;
    this.questionGroup.answer3 = group.answer3;
    this.questionGroup.answer4 = group.answer4;
    this.questionGroup.rightAnswer = group.right;
  }

  selectAnswer(number: string) {
    if (!this.canContinue && !this.IsTimerToShow) {
      let elemClass = "answer";
      let elements = document.getElementsByClassName(elemClass);
      for(let i = 0; i < elements.length; i++) {
        let elem = elements[i];
        if(elem.classList.contains(elemClass + number) &&
           !elem.getElementsByClassName("answer-container")[0].classList.contains('hidden')) {
          elem.classList.add('selected');
          this.currSelectedAnswer = i + 1;
        }
        else {
          elem.classList.remove('selected');
        }
      }
    }
  }

  checkAnswer() {
    if (this.IsTimerToShow && !this.timer.isTimerStarted()) {
      this.timer.startTimer();
    }
    else if (this.timer.isTimerStarted()) {
      this.timer.stopTimer();
      this.IsTimerToShow = false;
    }
    else if (this.IsHallToShow) {
      this.IsHallToShow = false;
    }
    else if (this.canContinue) {
      this.goToTheNextQuestion();
    }
    else {
      let elements = document.getElementsByClassName("answer");

      elements[this.currSelectedAnswer - 1].classList.remove('selected');
      if (this.currSelectedAnswer == this.questionGroup.rightAnswer) {
        elements[this.currSelectedAnswer - 1].classList.add('right');
        this.canContinue = true;
      }
      else {
        elements[this.currSelectedAnswer - 1].classList.add('wrong');
        elements[this.questionGroup.rightAnswer - 1].classList.add('right');
        this.canContinue = false;
        this.gameOver(false);
      }
    }
  }


  gameOver( isWinner: boolean) {
    if (isWinner) {
    }
    else {
    }

    this.isToShowGameOverForm = true;
  }
}
