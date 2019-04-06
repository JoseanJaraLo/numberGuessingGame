import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppGameComponent } from './my-app-game.component';

describe('MyAppGameComponent', () => {
  let component: MyAppGameComponent;
  let fixture: ComponentFixture<MyAppGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppGameComponent ]
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
