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