import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertMeta } from '../interfaces/alert.type';
import { SlUtilsService } from '../services/utils.service';

@Component({
  selector: 'sl-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit {
  @Input() data;
  files:string;
  formData;
  constructor(
    private utils: SlUtilsService
  ) {}

  ngOnInit(){
    this.files = 'Files'
  }

  basicUpload(event) {
    const files: FileList = event.target.files;
    let sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
    if (sizeMB > 50) {
      this.fileLimitCross();
      return;
    }
    this.formData = new FormData();
    Array.from(files).forEach((f) => this.formData.append('file', f));
    event.target.value = null;
    this.preSignedUrl(this.getFileNames(this.formData));
  }

  fileLimitCross() {
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'text',
      data: 'You can not cross 50MB',
      buttonClass: 'single-btn',
      acceptText: 'ok',
      cancelText: null,
    };
    this.utils.alert(alertMeta);
  }

  getFileNames(formData) {
    let files = [];
    formData.forEach((element) => {
      files.push(element.name);
    });
    return files;
  }

  preSignedUrl(files) {
    let payload = {};
    payload['ref'] = 'survey';
    payload['request'] = {};
    payload['request'][this.data.submissionId] = {
      files: files,
    };
    this.utils.getPreSingedUrls(payload).subscribe(
      (imageData) => {
        const presignedUrlData =
          imageData['result'][this.data.submissionId].files[0];
        this.formData.append('url', presignedUrlData.url);
        this.utils.cloudStorageUpload(this.formData).subscribe(
          (success: any) => {
            if (success.status === 200) {
              const obj = {
                name: this.getFileNames(this.formData)[0],
                url: presignedUrlData.url.split('?')[0],
              };
              for (const key of Object.keys(presignedUrlData.payload)) {
                obj[key] = presignedUrlData['payload'][key];
              }
              this.data.files.push(obj);
              const alertMeta: AlertMeta = {
                size: 'tiny',
                bodyType: 'text',
                data: 'upload',
                buttonClass: 'single-btn',
                acceptText: 'ok',
                cancelText: null,
                type: 'uploaded',
              };
              this.utils.alert(alertMeta);
            } else {
              this.utils.error(
                'unable to upload'
              );
            }
          },
          (error) => {
            this.utils.error(
            'upload error'
            );
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  extension(name) {
    return name.split('.').pop();
  }
  openFile(file) {
    window.open(file.url, '_blank');
  }

  async deleteAttachment(fileIndex) {
    const alertMeta: AlertMeta = {
      size: 'mini',
      bodyType: 'text',
      data: 'Confirm evidence delete',
      buttonClass: 'double-btn',
      acceptText: 'yes',
      cancelText: 'no',
    };
    const accepted = await this.utils.alert(alertMeta);

    if (!accepted) {
      return;
    }
    this.data.files.splice(fileIndex, 1);
  }

  async onAddApproval(file) {
    let html = `
    ${'Error policy'}<a href='/term-of-use.html' target="_blank">${'plocy lable'}</a> .${'upload evidence content'}
    `;
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'checkbox',
      data: html,
      buttonClass: 'double-btn',
      acceptText: 'Upload',
      cancelText: 'do not upload',
    };
    let returnData = await this.utils.alert(alertMeta);
    if (returnData == false) {
      this.notAccepted();
      return;
    }
    if (returnData == true) {
      file.click();
    }
  }

  notAccepted(): void {
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'text',
      data:'Terms rejected',
      buttonClass: 'single-btn',
      acceptText: 'ok',
      cancelText: null,
      type: 'notAccepted',
    };
    this.utils.alert(alertMeta);
  }
}
