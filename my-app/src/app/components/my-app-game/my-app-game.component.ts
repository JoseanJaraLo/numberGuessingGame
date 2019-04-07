import { Component, OnInit } from '@angular/core';
import { GameState, GameConfig } from '../../app.model';


@Component({
  selector: 'app-game',
  templateUrl: './my-app-game.component.html',
  styleUrls: ['./my-app-game.component.sass']
})
export class MyAppGameComponent implements OnInit {
  gameState: GameState;
  gameConfig: GameConfig;

  constructor() { }

  ngOnInit() {
    this.gameState = 'setup';
  }

  startGame(event) {
    this.gameConfig = event;
    this.gameState = 'play';
  }

  showOptions() {
    this.gameState = 'setup';
  }

}
