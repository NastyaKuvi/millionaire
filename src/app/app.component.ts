import { Component, HostListener, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import { element } from 'protractor';
import { TimerService } from './hints/timer/timer.service';
import { HallAssistanceService } from './hints/hall-assistance/hall-assistance.service';
import { StartGameService } from './start-game/start-game.service';
import { QuestionGroup } from './exportClasses';
import { AudioService } from './audio.service';
import { TimerComponent } from './hints/timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('hinthalf') hintHalf: ElementRef;
  @ViewChild('hintpeople') hintPeople: ElementRef;
  @ViewChild('hintring') hintRing: ElementRef;
  @ViewChild('hallAssist', { read: ElementRef }) hallAssist: ElementRef;
  @ViewChild('timerComp', { read: ElementRef }) timerComp: ElementRef;

  title: string;
  questionGroup: QuestionGroup;
  prizes = [];
  currSelectedAnswer: number;
  canContinue: boolean;
  canCheck: boolean;
  earnedPrize: string;
  fireProofPrizes: any;
  isToShowGameOverForm: boolean;
  isTimeToPlay: boolean;
  isBlockedQuestions: boolean;

  game: any = {};

  constructor(
    private timer: TimerService,
    private hallService: HallAssistanceService,
    private startService: StartGameService,
    private audioService: AudioService
  ) {
    this.startService.game$.subscribe((game) => {
      if (Object.keys(game).length === 0) {
        return;
      }
      this.title = game.title;
      this.prizes = game.prizes;
      this.earnedPrize = this.prizes[this.prizes.length - 1];
      this.isTimeToPlay = true;
      this.setNextQuestionGroup(game.questions[0], 1);
      this.game = game;
      this.canContinue = false;
      this.isBlockedQuestions = false;
      this.currSelectedAnswer = 0;

      // TODO: Remove this when 50/50 component will be created
      const hints = document.getElementsByClassName('hint');
      for (let i = 0; i < hints.length; i++) {
        hints[i].classList.remove('used');
      }
    });

    this.questionGroup = new QuestionGroup();
    this.currSelectedAnswer = 0;
    this.canContinue = false;
    this.canCheck = false;
    this.fireProofPrizes = [1, 6, 11, 14];
    this.isToShowGameOverForm = false;
    this.isTimeToPlay = false;
    this.isBlockedQuestions = false;
  }

  ngOnInit() {
    this.audioService.initAudioService();

    this.timer.activation$.subscribe((sub) => {
      this.isBlockedQuestions = sub;
      if (this.timerComp) {
        if (sub) {
        this.timerComp.nativeElement.classList.remove('hidden');
        } else {
          this.timerComp.nativeElement.classList.add('hidden');
        }
      }
    });

    this.hallService.activation$.subscribe((sub) => {
      this.isBlockedQuestions = sub;
      if (this.hallAssist) {
        if (sub) {
        this.hallAssist.nativeElement.classList.remove('hidden');
        } else {
          this.hallAssist.nativeElement.classList.add('hidden');
        }
      }
    });

  }

  ngAfterViewInit() {
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!this.isTimeToPlay) {
      return;
    }

    console.log(event.key + 'in app mode');
    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4': {
        if (!this.isToShowGameOverForm && !this.isBlockedQuestions) {
          this.selectAnswer(event.key);
        }
        break;
      }
      case 'Enter': {
        if (!this.isToShowGameOverForm) {
          if (!this.isBlockedQuestions) {
            this.checkAnswer();
          } else {
            if (this.timer.isTimerStarted()) {
              this.timer.stopTimer();
            } else {
              this.hallService.hide();
            }
          }
        }
        break;
      }

      case '5': {
        if (!this.isToShowGameOverForm && !this.isBlockedQuestions) {
          if (!this.hintHalf.nativeElement.classList.contains('used')) {
            this.callHalfHint();
            this.hintHalf.nativeElement.classList.add('used');
          }
        }
        break;
      }
      case '6': {
        if (!this.isToShowGameOverForm && !this.isBlockedQuestions) {
          if (!this.hintPeople.nativeElement.classList.contains('used')) {
            this.hallService.show();
            this.hintPeople.nativeElement.classList.add('used');
          }
        }
        break;
      }
      case '7': {
        if (!this.isToShowGameOverForm && !this.isBlockedQuestions) {
          if (!this.hintRing.nativeElement.classList.contains('used')) {
            this.timer.startTimer();
            this.hintRing.nativeElement.classList.add('used');
          }
        }
        break;
      }
      case ' ': {
        this.isToShowGameOverForm = false;
        this.isTimeToPlay = false;
        this.audioService.playBeforeStartAudio();
      }
    }
  }

  randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  callHalfHint() {
    const answerElems = document.getElementsByClassName('answer-container');
    const a = [1, 2, 3, 4];
    a.splice(this.questionGroup.rightAnswer - 1, 1);
    let r = this.randomInteger(0, 2);
    answerElems[a[r] - 1].classList.add('hidden');
    const temp = a[0];
    a[0] = a[r];
    a[r] = temp;

    r = this.randomInteger(1, 2);
    answerElems[a[r] - 1].classList.add('hidden');
  }

  goToTheNextQuestion() {
    this.currSelectedAnswer = 0;
    if (this.questionGroup.num === 14) {
      this.earnedPrize = this.prizes[0];
      this.gameOver(true);
    } else if (this.canContinue) {
      this.setNextQuestionGroup(this.game.questions[this.questionGroup.num], this.questionGroup.num + 1);
      this.canContinue = false;
      if (this.questionGroup.num < 11) {
        this.audioService.playMainFirstAudio();
      } else {
        this.audioService.playMainSecondAudio();
      }
    }
  }

  getIsCurrentPrize(prize: any) {
    const curIndex = this.prizes.length - this.questionGroup.num;

    if (this.questionGroup.num === 7 || this.questionGroup.num === 12) {
      this.earnedPrize = this.prizes[curIndex + 1];
    }
    return prize === this.prizes[curIndex];
  }

  setNextQuestionGroup(group: any, qNum: number) {
    const elemClass = 'answer';
    const elements = document.getElementsByClassName(elemClass);
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      elem.classList.remove('selected');
      elem.classList.remove('right');
      elem.classList.remove('wrong');
      elem.getElementsByClassName('answer-container')[0].classList.remove('hidden');
    }

    this.questionGroup.num = qNum;
    this.questionGroup.question = group.question;
    this.questionGroup.answer1 = group.answer1;
    this.questionGroup.answer2 = group.answer2;
    this.questionGroup.answer3 = group.answer3;
    this.questionGroup.answer4 = group.answer4;
    this.questionGroup.rightAnswer = parseInt(group.right, 10);
  }

  selectAnswer(number: string) {
    if (!this.canContinue && this.currSelectedAnswer === 0) {
      const elemClass = 'answer';
      const elements = document.getElementsByClassName(elemClass);
      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        if (elem.classList.contains(elemClass + number) &&
           !elem.getElementsByClassName('answer-container')[0].classList.contains('hidden')) {
          elem.classList.add('selected');
          this.currSelectedAnswer = i + 1;
          this.audioService.playAnsweredAudio();
        } else {
          elem.classList.remove('selected');
        }
      }
    }
  }

  checkAnswer() {
    if (this.canContinue) {
      this.goToTheNextQuestion();
    } else if (this.currSelectedAnswer !== 0) {
      const elements = document.getElementsByClassName('answer');

      elements[this.currSelectedAnswer - 1].classList.remove('selected');
      if (this.currSelectedAnswer === this.questionGroup.rightAnswer) {
        elements[this.currSelectedAnswer - 1].classList.add('right');
        this.canContinue = true;
        this.audioService.playRightAnswerAudio();
      } else {
        elements[this.currSelectedAnswer - 1].classList.add('wrong');
        elements[this.questionGroup.rightAnswer - 1].classList.add('right');
        this.canContinue = false;
        this.audioService.playWrongAnswerAudio();
        this.gameOver(false);
      }
    }
  }


  gameOver( isWinner: boolean) {
    if (isWinner) {
      this.audioService.playWinnerAudio();
    } else {
    }

    this.isToShowGameOverForm = true;
  }
}
