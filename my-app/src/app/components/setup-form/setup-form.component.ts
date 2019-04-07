import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameConfig } from '../../app.model';

@Component({
  selector: 'app-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.scss']
})
export class SetupFormComponent implements OnInit {
  @Output() sendGameConfig: EventEmitter<GameConfig> = new EventEmitter();

  gameSetup: FormGroup;
  constructor() { }

  ngOnInit() {
    this.gameSetup = new FormGroup({
      modeHumanAsks: new FormControl(false, Validators.required),
      randomLevel: new FormControl(false, Validators.required)
    });
  }

  getFormData(): GameConfig {
    const formData: GameConfig = {
      mode: this.gameSetup.get('modeHumanAsks').value ? 'humanAsks' : 'machineAsks',
      level: this.gameSetup.get('randomLevel').value ? 'random' : 'high'
    };
    return formData;
  }

  sendSetupConfig() {
    let setupConf: GameConfig;
    setupConf = this.getFormData();
    this.sendGameConfig.emit(setupConf);
  }

}
