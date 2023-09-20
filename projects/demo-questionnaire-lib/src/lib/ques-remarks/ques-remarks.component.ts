import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../interfaces/questionnaire.type';

@Component({
  selector: 'sl-ques-remarks',
  templateUrl: './ques-remarks.component.html',
  styleUrls: ['./ques-remarks.component.scss'],
})
export class QuesRemarksComponent implements OnInit {
  remark = '';
  showRemarks;

  @Output() saveClicked = new EventEmitter();
  @Input() question: Question;
  title: String;
  remarksAddText: String;
  constructor() {}

  ngOnInit() {
    this.title = 'Title';
    this.remarksAddText = 'Remarks add title';
    this.remark = this.question.remarks;
    this.remark ? (this.showRemarks = true) : false;
  }
  saveRemark() {
    this.question.remarks = this.remark;
    this.saveClicked.emit({ value: this.remark });
  }

  deleteRemark() {
    this.remark = '';
    this.saveRemark();
    this.showRemarks = false;
  }
}
