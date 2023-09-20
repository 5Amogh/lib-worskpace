import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question, Validation } from '../interfaces/questionnaire.type';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';

@Component({
  selector: 'sl-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnInit {
  date: any;
  min: Date;
  max: Date;

  @Input() questionnaireForm: FormGroup;
  @Input() question: Question;
  @Input() autoCaptureText: String;

  constructor(
    private qService: SlQuestionnaireService,
  ) {}

  ngOnInit() {
    this.autoCaptureText = 'Auto capture';
    setTimeout(() => {
      this.questionnaireForm.addControl(
        this.question._id,
        new FormControl(
          this.question.value ? new Date(this.question.value as string) : null,
          [this.qService.validate(this.question)]
        )
      );

      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
    });
    this.min = (this.question.validation as Validation).min
      ? new Date((this.question.validation as Validation).min)
      : null;
    this.max = (this.question.validation as Validation).max
      ? new Date((this.question.validation as Validation).max)
      : null;
  }

  onChange(e: string) {
    if(!e) return
    let value:any = this.dateTimeFormat(e);
    this.question.value = value;
    this.question.endTime = Date.now();
  }

  dateTimeFormat(e:any) {
    let x = new Date(e);
    let n = new Date();
    let h = n.getHours();
    let m = n.getMinutes();
    x.setHours(h);
    x.setMinutes(m);
    return x;
  }

  autoCapture() {
    this.questionnaireForm.controls[this.question._id].patchValue(
      new Date(Date.now())
    );
  }
}
