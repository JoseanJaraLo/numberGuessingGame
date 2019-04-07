import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MIN_VALUE, MAX_VALUE } from '../../app.constants';

import { GameBoardComponent } from './game-board.component';
import { GuessResponse } from 'src/app/app.model';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ GameBoardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks initial values when machineAsks', () => {
    component.mode = 'machineAsks';
    component.level = 'high';
    fixture.detectChanges();
    spyOn(component, 'startGame');

    component.ngOnInit();
    expect(component.limitBottom).toBe(MIN_VALUE);
    expect(component.limitTop).toBe(MAX_VALUE);
    expect(component.gameFinished).toBeFalsy();
    expect(component.magicNumber).toBe(0);
    expect(component.showQuestion).toBeFalsy();
    expect(component.responseType).toBeNull();
    expect(component.guessed).toBeNull();
    expect(component.thinkingOfANumber).toBeTruthy();
    expect(component.showGuessed).toBeFalsy();
    expect(component.startGame).toHaveBeenCalled();

  });

  it('checks initial values when humanAsks', () => {
    component.mode = 'humanAsks';
    component.level = 'high';
    fixture.detectChanges();
    spyOn(component, 'startGame').and.callThrough();

    component.ngOnInit();

    expect(component.limitBottom).toBe(MIN_VALUE);
    expect(component.limitTop).toBe(MAX_VALUE);
    expect(component.gameFinished).toBeFalsy();
    expect(component.magicNumber).toBeGreaterThan(0);
    expect(component.showQuestion).toBeTruthy();
    expect(component.responseType).toBeNull();
    expect(component.guessed).toBeNull();
    expect(component.thinkingOfANumber).toBeFalsy();
    expect(component.showGuessed).toBeFalsy();
    expect(component.startGame).toHaveBeenCalled();
  });

  it('checks checkAnswer() response', () => {
    component.magicNumber = 1;
    expect(component.checkAnswer(0)).toBe('tooLow');
    expect(component.checkAnswer(2)).toBe('tooHigh');
    expect(component.checkAnswer(1)).toBe('gameOver');
  });

  it('checks checkValidity() response', () => {
    component.guessed = MIN_VALUE;
    expect(component.checkValidity()).toBeTruthy();

    component.guessed = MAX_VALUE;
    expect(component.checkValidity()).toBeTruthy();

    component.guessed = MAX_VALUE + 1;
    expect(component.checkValidity()).toBeFalsy();

    component.guessed = MIN_VALUE - 1;
    expect(component.checkValidity()).toBeFalsy();
  });

  it('checks generateNumber() value', () => {
    const randomNumber = component.generateNumber(MIN_VALUE, MAX_VALUE);
    expect(randomNumber).toBeGreaterThanOrEqual(MIN_VALUE);
    expect(randomNumber).toBeLessThanOrEqual(MAX_VALUE);
  });

  it('should update the limits and recall machineGuess() after calling giveAnswerToMachine() or over the game', () => {
    let guessResponse: GuessResponse = 'tooLow';
    component.guessed = 1;
    spyOn(component, 'machineGuess').and.callThrough();
    component.giveAnswerToMachine(guessResponse);
    expect(component.limitBottom).toBe(2);
    expect(component.machineGuess).toHaveBeenCalled();

    guessResponse = 'tooHigh';
    component.guessed = 1;
    component.giveAnswerToMachine(guessResponse);
    expect(component.limitTop).toBe(0);
    expect(component.machineGuess).toHaveBeenCalled();

    component.responseType = null;
    guessResponse = 'gameOver';
    component.giveAnswerToMachine(guessResponse);
    expect(component.responseType).toEqual(guessResponse);
  });

  it('should return a guessed number according to the game level', () => {
    component.level = 'random';
    component.limitBottom = 1;
    component.limitTop = 100;
    component.showGuessed = false;
    component.guessed = 0;
    component.machineGuess();

    expect(component.guessed).toBeGreaterThanOrEqual(component.limitBottom);
    expect(component.guessed).toBeLessThanOrEqual(component.limitTop);
    expect(component.showGuessed).toBeTruthy();

    component.level = 'high';
    component.limitBottom = 1;
    component.limitTop = 100;
    component.showGuessed = false;
    component.guessed = 0;
    component.machineGuess();

    expect(component.guessed).toBe(50);
    expect(component.showGuessed).toBeTruthy();
  });

  it('checks values after startGame()', () => {
    component.limitTop = MAX_VALUE;
    component.limitBottom = MIN_VALUE;
    component.gameFinished = false;
    component.magicNumber = 0;
    component.showQuestion = false;
    component.responseType = null;
    component.guessed = null;
    component.thinkingOfANumber = false;
    component.showGuessed = false;

    component.mode = 'humanAsks';
    spyOn(component, 'generateNumber').and.callThrough();
    component.startGame();
    expect(component.magicNumber).toBeGreaterThanOrEqual(component.limitBottom);
    expect(component.showQuestion).toBeTruthy();
    expect(component.generateNumber).toHaveBeenCalled();

    component.mode = 'machineAsks';
    component.startGame();
    expect(component.thinkingOfANumber).toBeTruthy();
  });

  it('checks that app values are rightly reset', () => {
    component.limitTop = null;
    component.limitBottom = null;
    component.gameFinished = true;
    component.magicNumber = null;
    component.showQuestion = true;
    component.responseType = 'gameOver';
    component.guessed = 0;
    component.thinkingOfANumber = true;
    component.showGuessed = true;

    component.resetGame();

    expect(component.limitTop).toBe(MAX_VALUE);
    expect(component.limitBottom).toBe(MIN_VALUE);
    expect(component.gameFinished).toBeFalsy();
    expect(component.magicNumber).toBe(0);
    expect(component.showQuestion).toBeFalsy();
    expect(component.responseType).toBeNull();
    expect(component.guessed).toBeNull();
    expect(component.thinkingOfANumber).toBeFalsy();
    expect(component.showGuessed).toBeFalsy();
  });

});
