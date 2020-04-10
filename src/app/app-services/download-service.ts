import {Injectable} from '@angular/core';
import * as fileSaver from 'file-saver';
import {UploadService} from './upload-service';

@Injectable()
export class DownloadService {
  constructor(private uploadService: UploadService) {}

  excelDownload(id: number, upload: boolean, name: string) {
    this.uploadService.downloadFile(id, upload).pipe().subscribe((res: any) => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
      fileSaver.saveAs(blob, name);
    });
  }

  excelDownloadFileName(name: string) {
    this.uploadService.downloadFileName(name).pipe().subscribe((res: any) => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
      fileSaver.saveAs(blob, name);
    });
  }
}
