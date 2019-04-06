import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SetupFormComponent } from './components/setup-form/setup-form.component';
import { MyAppGameComponent } from './components/my-app-game/my-app-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameBoardComponent } from './components/game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupFormComponent,
    MyAppGameComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
