import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAppGameComponent } from './my-app-game.component';
import { SetupFormComponent } from '../setup-form/setup-form.component';
import { GameBoardComponent } from '../game-board/game-board.component';


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
});
