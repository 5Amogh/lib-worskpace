import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocationStrategy } from '@angular/common'

@Component({
  selector: 'sl-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @ViewChild('modal') modal;
  @Input() isDimmed;
  @Input() hint;
  @Output() closeHintEmitter = new EventEmitter();
  hintCloseText: string;
  hintModalNote:string
  constructor(
    public location:LocationStrategy
  ) {
    this.location.onPopState(()=>{
      this.isDimmed = false;
      this.closeHintEmitter.emit({})
    })
   }

  ngOnInit(){
    this.hintCloseText = 'close';
    this.hintModalNote = 'Note: Hint Modal Note';
  }

  closeHint(){
    this.isDimmed = false;
    this.closeHintEmitter.emit()
  }

}
