import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyAppGameComponent } from './components/my-app-game/my-app-game.component';
import { SetupFormComponent } from './components/setup-form/setup-form.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule],
      declarations: [
        AppComponent,
        MyAppGameComponent,
        SetupFormComponent,
        GameBoardComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
