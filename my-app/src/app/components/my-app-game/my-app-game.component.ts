import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './my-app-game.component.html',
  styleUrls: ['./my-app-game.component.sass']
})
export class MyAppGameComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

  startGame(event) {
    console.info(event);
  }

}
