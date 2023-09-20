import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';

@Component({
  selector: 'sl-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements OnInit {
  placeholder;
  response: string;
  @Input() questionnaireForm: FormGroup;
  @Input() question: Question;
  constructor(
    private qService: SlQuestionnaireService,
    private translate: SlTranslateService
  ) {}

  ngOnInit() {
    this.placeholder = this.translate['frmelmnts']?.lbl?.enterResponse;
    setTimeout(() => {
      this.questionnaireForm.addControl(
        this.question._id,
        new FormControl(this.question.value || null, [
          this.qService.validate(this.question),
        ])
      );
      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
    });
  }
  onChange(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.question.value = value;

    this.question.endTime = Date.now();
  }

  get isValid(): boolean {
    return this.questionnaireForm.controls[this.question._id].valid;
  }

  get isTouched(): boolean {
    return this.questionnaireForm.controls[this.question._id].touched;
  }
}
