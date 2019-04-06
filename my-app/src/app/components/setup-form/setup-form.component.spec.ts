import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFormComponent } from './setup-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameConfig } from '../../app.model';

describe('SetupFormComponent', () => {
  let component: SetupFormComponent;
  let fixture: ComponentFixture<SetupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ SetupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks initial form value', () => {
    expect(component.gameSetup.valid).toBeTruthy();
    const modeValue = component.gameSetup.get('modeHumanAsks').value;
    const randomValue = component.gameSetup.get('randomLevel').value;
    expect(modeValue).toBeFalsy();
    expect(randomValue).toBeFalsy();
  });

  it('should format rightly the form data using getFormData()', () => {
    let setupData: GameConfig = {
      mode: 'humanAsks',
      level: 'random'
    };
    let mode = component.gameSetup.get('modeHumanAsks');
    let random = component.gameSetup.get('randomLevel');
    mode.setValue(true);
    random.setValue(true);
    expect(component.getFormData()).toEqual(setupData);

    setupData = {
      mode: 'machineAsks',
      level: 'high'
    };
    mode.setValue(false);
    random.setValue(false);
    expect(component.getFormData()).toEqual(setupData);
  });

  it('should emit the right data when sendSetupConfig()', () => {
    let gameConfig: GameConfig;
    const getFormDataValue: GameConfig = {
      mode: 'machineAsks',
      level: 'high'
    };

    component.sendGameConfig.subscribe( value => gameConfig = value );

    spyOn(component, 'getFormData').and.returnValue(getFormDataValue);
    component.sendSetupConfig();
    expect(component.getFormData).toHaveBeenCalled();
    expect(gameConfig.mode).toBe('machineAsks');
    expect(gameConfig.level).toBe('high');
  });


});
