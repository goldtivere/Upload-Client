import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig, PageEvent} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {PageData} from '../../utils/model/page-data';
import {AuthenticationService} from '../../auth-services/authentication.service';
import {SelectOptions} from '../../utils/model/select-options';
import {RoleType} from '../../utils/model/role-type.enum';
import {UploadQueryModel} from '../../utils/model/upload-query-model';
import {Utils} from '../../utils/model/utils';
import {GenericStatus} from '../../utils/model/generic-status';
import {TaskType} from '../../utils/model/task-type.enum';
import {ErrorService} from '../../app-services/error.service';
import {UploadService} from '../../app-services/upload-service';
import {DownloadService} from '../../app-services/download-service';
import {ApprovalObject} from '../../utils/model/approval-object';
import {TaskService} from '../../app-services/task-service';
import {TokenDialogComponent} from '../../dialog/token-dialog/token-dialog.component';

@Component({
  selector: 'app-org-management',
  templateUrl: './upload-management.component.html',
  styleUrls: ['./upload-management.component.css']
})

export class UploadManagementComponent implements OnInit {
  static anotherThis;
  uploadData: PageData;
  authenticationService: AuthenticationService;
  pageParams: Params;
  pageQueryModel: UploadQueryModel = new UploadQueryModel();
  pageLoading = true;
  makingSearchCall = false;
  searchCallQueue = false;
  bsModalRef: BsModalRef;
  tasks = [];
  selectedTask: any = {};
  uploadFile: FileSnippet;
  reconciliationFile: FileSnippet;
  error: string;
  success: string;
  user: any;
  roleTypes = RoleType;
  genericStatus = GenericStatus;
  taskTypes = TaskType;
  selectOptions = new SelectOptions();
  snackBarConfig = new MatSnackBarConfig();
  pageUtils = new Utils();
  modalOptions = new ModalOptions();

  uploadStatus: string;

  @ViewChild('fileInput', {static: true}) dataFile: ElementRef;
  @ViewChild('fileInput2', {static: true}) reconcileFile: ElementRef;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private taskService: TaskService,
              private downloadService: DownloadService,
              private uploadService: UploadService, private errorService: ErrorService) {
    this.authenticationService = authService;
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;

    this.snackBarConfig.duration = 3000;
  }


  ngOnInit() {
    this.getSubscription();
    this.selectedTask = null;
    UploadManagementComponent.anotherThis = this;
  }

  getPageParamsAndTablesData() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageParams = response;
      this.pageQueryModel.page = this.pageParams['page'];
      this.pageQueryModel.pageSize = this.pageParams['limit'];
      this.getUploads();
    });
  }

  getTasks() {
    this.taskService.getTasks().pipe().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  getUploads() {
    if (this.makingSearchCall) {
      this.searchCallQueue = true;
      return;
    }
    this.makingSearchCall = true;
    this.searchCallQueue = false;
    this.uploadService.getUploads(this.pageQueryModel).subscribe((response: any) => {
      this.uploadData = response;
      this.pageLoading = false;
      this.makingSearchCall = false;
      if (this.searchCallQueue) {
        this.getUploads();
      }
    }, error => {
      this.makingSearchCall = false;
      this.pageLoading = false;
    });
  }

  dataChange() {
    this.getUploads();
  }

  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getPageParamsAndTablesData();
        this.getTasks();
      }
    );
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageQueryModel.pageSize = pageEvent.pageSize;
    this.pageQueryModel.page = pageEvent.pageIndex;
    this.getUploads();
  }

  canShowTable() {
    return (this.uploadData && this.uploadData.totalElements > 0) && !this.pageLoading;
  }

  canShowNoData() {
    return (!this.uploadData || this.uploadData.totalElements == 0) && !this.pageLoading;
  }


  upload() {
    this.error = null;
    this.success = null;

    if (!this.selectedTask || !this.uploadFile) {
      this.error = 'Please capture all required fields';
      return;
    }

    const files = [this.uploadFile.file];

    if (this.selectedTask.reconcile) {
      if (!this.reconciliationFile) {
        this.error = 'Reconciliation file is required for task';
        return;
      } else {
        files.push(this.reconciliationFile.file);
      }
    }

    this.uploadFile.pending = true;

    this.uploadService.uploadFiles(this.selectedTask.id,
      files).subscribe(
      (res: any[]) => {
        this.snackBar.open(`File(s) have been uploaded!`, null, this.snackBarConfig);
        this.onSuccess();
      },
      (err) => {
        this.onError();
    });
  }

  validateTokenAndApprove(upload: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      task: 'approve upload'
    }

    const dialogRef = this.dialog.open(TokenDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);
        if (data == 'approve upload') {
          UploadManagementComponent.anotherThis.approveUpload(upload, true);
        }
      }
    );
  }

  approveUpload(upload: any, approve: boolean) {
    const approvalObject = new ApprovalObject();
    approvalObject.approve = approve;
    UploadManagementComponent.anotherThis.uploadService.approveUpload(upload.id, approvalObject).pipe()
      .subscribe((response) => {
        let message;
        if (approve) {
          message = 'Upload has been approved';
        } else {
          message = 'Upload has been rejected';
        }
        UploadManagementComponent.anotherThis.getUploads();
        UploadManagementComponent.anotherThis.snackBar.open(`${message}`, null, UploadManagementComponent.anotherThis.snackBarConfig);
        UploadManagementComponent.anotherThis.bsModalRef.hide();
      }, error => {
        UploadManagementComponent.anotherThis.error = UploadManagementComponent.anotherThis.errorService.getErrorMessage(error);
        UploadManagementComponent.anotherThis.snackBar.open(UploadManagementComponent.anotherThis.error, null, UploadManagementComponent.anotherThis.snackBarConfig);
      });
  }

  downloadFile(id: number, upload: boolean, name: string) {
    this.downloadService.excelDownload(id, upload, name);
  }

  downloadFileName(name: string) {
    this.downloadService.excelDownloadFileName(name);
  }

  private onSuccess() {
    this.uploadFile.pending = false;
    this.uploadStatus = 'ok';
    this.resetFileInputs();
    this.getUploads();
  }

  private onError() {
    this.uploadFile.pending = false;
    this.uploadStatus = 'fail';
    this.uploadFile.src = null;
    if (this.reconciliationFile) {
      this.reconciliationFile.src = null;
    }

    this.resetFileInputs();
  }

  uploadDataFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.uploadFile = new FileSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  uploadReconciliationFile(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {

      this.reconciliationFile = new FileSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  resetFileInputs() {
    this.dataFile.nativeElement.value = '';
    if (this.reconciliationFile) {
      this.reconcileFile.nativeElement.value = '';
    }
    this.uploadFile = null;
    this.reconciliationFile = null;
  }
}


class FileSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
