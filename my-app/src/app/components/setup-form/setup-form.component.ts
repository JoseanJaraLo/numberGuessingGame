import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.sass']
})
export class SetupFormComponent implements OnInit {
  gameSetup: FormGroup;
  constructor() { }

  ngOnInit() {
    this.gameSetup = new FormGroup({
      modeHumanAsk: new FormControl('false', Validators.required),
      randomLevel: new FormControl('false')
    });
  }

}
