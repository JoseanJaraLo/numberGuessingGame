import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SetupFormComponent } from './components/setup-form/setup-form.component';
import { MyAppGameComponent } from './components/my-app-game/my-app-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupFormComponent,
    MyAppGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }