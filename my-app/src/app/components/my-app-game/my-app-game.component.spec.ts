import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAppGameComponent } from './my-app-game.component';
import { SetupFormComponent } from '../setup-form/setup-form.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameState, GameConfig } from '../../app.model';


describe('MyAppGameComponent', () => {
  let component: MyAppGameComponent;
  let fixture: ComponentFixture<MyAppGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule],
      declarations: [ MyAppGameComponent, SetupFormComponent, GameBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks initial values for the app', () => {
    component.ngOnInit();
    expect(component.gameState).toBe('setup');
  });

  it('should update state after startGame()', () => {
    const mockedConfig: GameConfig = {
      mode: 'humanAsks',
      level: 'random'
    };
    component.startGame(mockedConfig);
    expect(component.gameConfig).toEqual(mockedConfig);
    expect(component.gameState).toBe('play');
  });

  it('should update state after showOptions()', () => {
    component.gameState = 'play';
    component.showOptions();
    expect(component.gameState).toBe('setup');
  });
});
