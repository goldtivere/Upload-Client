import {Injectable} from '@angular/core';
import * as fileSaver from 'file-saver';
import {UploadService} from './upload-service';
import {ExportAsConfig, ExportAsService, SupportedExtensions} from "ngx-export-as";



@Injectable()
export class DownloadService {
  config: ExportAsConfig;
  constructor(private uploadService: UploadService,private exportAsService: ExportAsService) {}

  excelDownload(id: number, upload: boolean, name: string) {
    this.uploadService.downloadFile(id, upload).pipe().subscribe((res: any) => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
      fileSaver.saveAs(blob, name);
    });
  }

  exportAs(type: SupportedExtensions, fileName: string) {
    this.config = {
      type: type, // the type you want to download
      elementIdOrContent: 'tab', // the id of html/table element
    };

    this.exportAsService.save(this.config, fileName + '_' + new  Date().getTime()).subscribe(() => {

      });
  }
  exportAsDebit(type: SupportedExtensions, fileName: string) {
    this.config = {
      type: type, // the type you want to download
      elementIdOrContent: 'tabDebit', // the id of html/table element
    };

    this.exportAsService.save(this.config, fileName + '_' + new  Date().getTime()).subscribe(() => {

    });
  }
  excelDownloadFileName(name: string) {
    this.uploadService.downloadFileName(name).pipe().subscribe((res: any) => {
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
      fileSaver.saveAs(blob, name);
    });
  }
}
