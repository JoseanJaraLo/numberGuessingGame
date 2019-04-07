import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GuessResponse } from '../../app.model';
import { MAX_VALUE, MIN_VALUE } from '../../app.constants';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.sass']
})
export class GameBoardComponent implements OnInit {
  @Input() mode: string = 'machineAsks';
  @Input() level: string = 'high';
  @Output() displayOptions: EventEmitter<any> = new EventEmitter();

  // Max number to be guessed.
  limitTop: number;

  // Min number to be guessed
  limitBottom: number;

  // Indicates that the game has finished
  gameFinished: boolean = false;

  // Number to be guessed when the human asks
  magicNumber: number;

  // Asks for a number to the human
  showQuestion: boolean = false;

  // Shows a panel while human is thinking of a number
  thinkingOfANumber: boolean = false;

  // Shows the number guessed by the machine.
  showGuessed: boolean = false

  // Number guessed to be checked
  guessed: number;

  // Type of answer message after checking the number.
  responseType: GuessResponse;


  constructor() { }

  ngOnInit() {
    this.startGame();
  }

  ngOnChange(event) {

  }

  changeOptions() {
    this.displayOptions.emit();
  }

  checkAnswer(guessed: number): GuessResponse {
    let guessAnswer: GuessResponse;
    if(guessed > this.magicNumber) {
      guessAnswer = 'tooHigh';
    } else if ( guessed < this.magicNumber) {
      guessAnswer = 'tooLow';
    } else {
      this.gameFinished = true;
      guessAnswer = 'gameOver';
    }
    return guessAnswer;
  }

  checkValidity(): boolean {
    return (
      this.guessed
      && typeof this.guessed === 'number'
      && this.guessed >= MIN_VALUE
      && this.guessed <= MAX_VALUE);
  }

  generateNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  giveAnswerToMachine(guessResponse: GuessResponse) {
    this.showGuessed = false;
    switch(guessResponse) {
      case 'tooLow':
        this.limitBottom = this.guessed + 1;
        this.machineGuess();
        break;
      case 'tooHigh':
        this.limitTop = this.guessed - 1;
        this.machineGuess();
        break;
      case 'gameOver':
        this.responseType = guessResponse;
    }
  }

  giveGuessedToMachine() {
    if(this.checkValidity()) {
      this.responseType = this.checkAnswer(this.guessed);
    }
  }

  machineGuess() {
    this.thinkingOfANumber = false;
    if (this.level === 'random') {
      this.guessed = this.generateNumber(this.limitBottom, this.limitTop);
    } else {
      this.guessed = Math.floor((this.limitBottom + this.limitTop) / 2);
    }
    this.showGuessed = true;

  }

  startGame() {
    this.resetGame();
    if(this.mode === 'humanAsks') {
      this.magicNumber = this.generateNumber(this.limitBottom, this.limitTop);
      this.showQuestion = true;
    } else {
      this.thinkingOfANumber = true;
    }
  }

  resetGame() {
    this.limitTop = MAX_VALUE;
    this.limitBottom = MIN_VALUE;
    this.gameFinished = false;
    this.magicNumber = 0;
    this.showQuestion = false;
    this.responseType = null;
    this.guessed = null;
    this.thinkingOfANumber = false;
    this.showGuessed = false;
  }

}
