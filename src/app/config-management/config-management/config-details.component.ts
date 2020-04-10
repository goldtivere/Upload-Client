import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatSnackBarConfig,
  PageEvent
} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RoleType} from '../../utils/model/role-type.enum';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {AuthenticationService} from '../../auth-services/authentication.service';
import {UserService} from '../../app-services/user.service';
import {ConnectionService} from '../../app-services/connection-service';
import {TableService} from '../../app-services/table-service';
import {UploadService} from '../../app-services/upload-service';
import {AccountService} from '../../app-services/account-service';
import {ScheduleService} from '../../app-services/schedule-service';
import {Utils} from '../../utils/model/utils';
import {TaskService} from '../../app-services/task-service';
import {GenericStatus} from '../../utils/model/generic-status';
import {SelectOptions} from '../../utils/model/select-options';
import {ExcelService} from '../../app-services/excel-service';
import {ErrorService} from '../../app-services/error.service';
import {ApprovalObject} from '../../utils/model/approval-object';
import {DataType} from '../../utils/model/data-type-enum';
import {JobPeriod} from '../../utils/model/job-period-enum';

@Component({
  selector: 'app-view-merchant-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.css']
})
export class ConfigDetailsComponent implements OnInit {
  connectionForm: FormGroup;
  editConnectionForm: FormGroup;
  taskForm: FormGroup;
  editTaskForm: FormGroup;
  tableForm: FormGroup;
  scheduleForm: FormGroup;
  editScheduleForm: FormGroup;
  accountForm: FormGroup;
  genericStatus = GenericStatus;
  connections = [];
  schedules = [];
  tables = [];
  tasks = [];
  connection: any;
  task: any;
  schedule: any;
  accounts = [];
  selectOptions = new SelectOptions();
  dataTypes = DataType;
  jobPeriods = JobPeriod;
  pageLoading = true;
  roleTypes = RoleType;
  bsModalRef: BsModalRef;
  snackBarConfig = new MatSnackBarConfig();
  error: string;
  success: string;
  user: any;
  authenticationService: AuthenticationService;

  isLoading: boolean;
  pageUtils = new Utils();
  accountNumber: string;
  account: any;

  taskReconcile = false;
  taskAmountInData = false;

  tableReconcile = false;
  amountInData = false;

  accountInData = false;


  fetchingAccount = false;

  modalOptions = new ModalOptions();

  columns: Column[] = [];
  taskTables = [];
  columnCount = 0;

  table: any;

  @ViewChild('columnModal', {static: true}) columnModal: any;
  @ViewChild('accountModal' , {static: true}) accountModal: any;
  @ViewChild('taskModal' , {static: true}) taskModal: any;
  @ViewChild('scheduleModal' , {static: true}) scheduleModal: any;
  @ViewChild('tableModal', {static: true}) tableModal: any;
  @ViewChild('connectionModal', {static: true}) connectionModal: any;
  @ViewChild('editTaskModal', {static: true}) editTaskModal: any;
  @ViewChild('editScheduleModal', {static: true}) editScheduleModal: any;
  @ViewChild('editConnectionModal', {static: true}) editConnectionModal: any;
  @ViewChild('fileInput', {static: true}) inputFile: ElementRef;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private authService: AuthenticationService,
              private accountService: AccountService,
              private uploadService: UploadService,
              private tableService: TableService,
              private userService: UserService,
              private scheduleService: ScheduleService,
              private taskService: TaskService,
              private connectionService: ConnectionService,
              private dialog: MatDialog,
              private excelService: ExcelService, private errorService: ErrorService) {
    this.authenticationService = authService;
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.taskForm = fb.group({
      'name': ['', Validators.required],
      'scheduleId': ['', Validators.required],
      'tableId': ['', Validators.required],
      'accountId': ['', Validators.required],
      'connectionId': ['', Validators.required],
      'narration': ['', Validators.required],
      'description': [''],
      'fetchTable': [''],
      'fetchColumn': [''],
      'accountColumn': [''],
      'charge': [''],
      'accountInData': [''],
      'amountInData': [''],
      'reconcile': ['']
    });

    this.editTaskForm = fb.group({
      'name': ['', Validators.required],
      'scheduleId': ['', Validators.required],
      'tableId': ['', Validators.required],
      'accountId': ['', Validators.required],
      'connectionId': ['', Validators.required],
      'narration': ['', Validators.required],
      'description': [''],
      'fetchTable': [''],
      'fetchColumn': [''],
      'accountColumn': [''],
      'charge': [''],
      'accountInData': [''],
      'amountInData': [''],
      'reconcile': ['']
    });

    this.accountForm = fb.group({
      'accountNumber': ['', Validators.required]
    });

    this.scheduleForm = fb.group({
      'name': ['', Validators.required],
      'period': ['', Validators.required],
      'minute': ['', Validators.required],
      'hour': ['', Validators.required]
    });

    this.editScheduleForm = fb.group({
      'name': ['', Validators.required],
      'period': ['', Validators.required],
      'minute': ['', Validators.required],
      'hour': ['', Validators.required]
    });

    this.connectionForm = fb.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'password': [''],
      'driverType': ['', Validators.required],
      'url': ['', Validators.required]
    });

    this.editConnectionForm = fb.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'password': [''],
      'driverType': ['', Validators.required],
      'url': ['', Validators.required]
    });

    this.tableForm = fb.group({
      'name': ['', Validators.required],
      'canReconcile': [''],
      'description': [''],
      'identifierId': ['', Validators.required],
      'reconciliationId': [''],
      'amountId': ['']
    });

    this.snackBarConfig.duration = 3000;
  }


  ngOnInit() {
    this.getSubscription();
  }

  getAccounts() {
    this.accountService.getAccounts().pipe().subscribe((response: any) => {
      this.accounts = response;
    });
  }

  getSchedules() {
    this.scheduleService.getSchedules().pipe().subscribe((response: any) => {
      this.schedules = response;
    });
  }

  getTables() {
    this.tableService.getTables().pipe().subscribe((response: any) => {
      this.tables = response;
      this.taskTables = this.tables;
    });
  }

  getTasks() {
    this.taskService.getTasks().pipe().subscribe((response: any) => {
      this.tasks = response;
    });
  }

  getConnections() {
    this.connectionService.getConnections().pipe().subscribe((response: any) => {
      this.connections = response;
    });
  }

  getSubscription() {
    this.authenticationService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.getAccounts();
        this.getTasks();
        this.getConnections();
        this.getTables();
        this.getSchedules();
      }
    );
  }

  reconcileFieldClicked(edit: boolean) {
    const taskForm = edit ? this.editTaskForm : this.taskForm;

    if (this.taskReconcile) {
      this.taskTables = this.tables.filter(t => t.canReconcile);
      if (taskForm.value['table']) {
        const selected = this.taskTables.find(t => t.id == taskForm.value['table']);
        if (!selected) {
          taskForm.value['table'] = null;
        }
      }
    } else {
      this.taskTables = this.tables;
    }
  }

  isAmountDataTypeColumn(column: Column) {
    if (!this.amountInData) {
      return false;
    }
    if (column.count == this.tableForm['amountId']) {
      console.log(column);
      column.dataType = DataType.BIG_DECIMAL;
      return true;
    }
    return false;
  }

  amountOrReconcileFieldClicked(edit: boolean) {
    const taskForm = edit ? this.editTaskForm : this.taskForm;

    if (this.taskAmountInData || this.taskReconcile) {
      if (this.taskReconcile) {
        this.taskTables = this.tables.filter(t => t.canReconcile);
      }
      if (this.taskAmountInData) {
        this.taskTables = this.tables.filter(t => t.amountInData);
      }

      if (taskForm.value['table']) {
        const selected = this.taskTables.find(t => t.id == taskForm.value['table']);
        if (!selected) {
          taskForm.value['table'] = null;
        }
      }
    } else {
      this.taskTables = this.tables;
    }
  }

  openAccountModal(): void {
    this.error = null;
    this.success = null;
    this.bsModalRef = this.modalService.show(this.accountModal, this.modalOptions);
  }

  validateTableData() {
    this.error = null;
    if (!/^[a-z].*$/i.test(this.tableForm.value[name])) {
      this.error = 'Ensure table name starts with alphabet';
      return;
    }

    this.columns.forEach(c => {
      if (!c.name || c.name.trim() == '') {
        this.error = 'Input column name(s)';
      } else if (!/^[a-z].*$/i.test(c.name)) {
        this.error = 'Ensure column name(s) starts with alphabet';
      } else if (!c.dataType) {
        this.error = 'Specify data type for each column';
      } else if (c.dataSize < 0) {
        this.error = 'Column size can not be less than zero';
      }
    })
    if (this.error) {
      return;
    }

    if (this.tableReconcile && !this.tableForm.value['reconciliationId']) {
      this.error = 'Select reconciliation column';
      return;
    }

    if (this.amountInData && !this.tableForm.value['amountId']) {
      this.error = 'Select amount column';
      return;
    }

    if (this.tableReconcile &&
        (this.tableForm.value['identifierId'] == this.tableForm.value['reconciliationId'])) {
      this.error = 'Identifier column can not be the same as reconciliation column';
      return;
    }

    if (this.amountInData &&
      (this.tableForm.value['identifierId'] == this.tableForm.value['amountId'] ||
        this.tableForm.value['reconciliationId'] == this.tableForm.value['amountId'])) {
      this.error = 'Amount column can not be the same as identifier or reconciliation column';
      return;
    }

    this.columns.forEach(c => {
      if (c.count == this.tableForm.value['identifierId']) {
        c.identifier = true;
      } else {
        c.identifier = false;
      }

      if (this.tableReconcile && c.count == this.tableForm.value['reconciliationId']) {
        c.reconciliation = true;
      } else {
        c.reconciliation = false;
      }

      if (this.amountInData && c.count == this.tableForm.value['amountId']) {
        c.amountField = true;
      } else {
        c.amountField = false;
      }
    });

    this.tableForm.value['columns'] = this.columns;
  }

  saveTableData() {
    this.error = null;
    this.success = null;

    if (!this.tableForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    this.validateTableData();

    const formValue = this.tableForm.value;
    formValue['canReconcile'] = this.tableReconcile;
    formValue['accountInData'] = this.accountInData;
    formValue['amountInData'] = this.amountInData;
    console.log(formValue);

    if (!this.error) {
      this.tableService.create(formValue).pipe().subscribe((response: any) => {
        this.success = 'Table has been successfully created!';
        this.snackBar.open(this.success, null, this.snackBarConfig);
        this.columns = [];
        this.getTables();
        this.bsModalRef.hide();
      }, error => {
        this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
      });
    }
  }


  saveTask() {
    this.error = null;
    this.success = null;

    if (!this.taskForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    const formValue = this.taskForm.value;
    formValue['reconcile'] = this.taskReconcile;
    formValue['accountInData'] = this.accountInData;
    formValue['amountInData'] = this.taskAmountInData;

    if (!formValue['accountInData'] && (!formValue['fetchTable'] || !formValue['fetchColumn'] ||
        !formValue['accountColumn'])) {
      this.error = 'Please capture all fields required to fetch account number.';
      return;
    }

    if (!this.taskAmountInData && !formValue['charge']) {
      this.error = 'Please capture fee amount.';
      return;
    }

    this.taskService.createTask(formValue['scheduleId'], formValue['connectionId'],
        formValue['tableId'], formValue['accountId'], formValue).pipe().subscribe(res => {
      this.success = 'Task has been successfully created!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getTasks();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  editTask() {
    this.error = null;
    this.success = null;

    if (!this.editTaskForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    const formValue = this.editTaskForm.value;
    formValue['reconcile'] = this.taskReconcile;
    formValue['accountInData'] = this.accountInData;
    formValue['amountInData'] = this.taskAmountInData;

    if (!formValue['accountInData'] && (!formValue['fetchTable'] || !formValue['fetchColumn'] ||
      !formValue['accountColumn'])) {
      this.error = 'Please capture all fields required to fetch account number.';
      return;
    }

    if (!this.taskAmountInData && !formValue['charge']) {
      this.error = 'Please capture fee amount.';
      return;
    }

    this.taskService.editTask(this.task.id, formValue['scheduleId'], formValue['connectionId'],
      formValue['tableId'], formValue['accountId'], formValue).pipe().subscribe(res => {
      this.success = 'Task has been successfully edited!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getTasks();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  saveConnection() {
    this.error = null;
    this.success = null;

    if (!this.connectionForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    this.connectionService.createConnection(this.connectionForm.value).pipe().subscribe(res => {
      this.success = 'Connection has been successfully created!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getConnections();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  editConnection() {
    this.connectionService.editConnection(this.connection.id, this.editConnectionForm.value).pipe().subscribe(res => {
      this.success = 'Connection has been successfully edited!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getConnections();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  saveSchedule() {
    this.error = null;
    this.success = null;

    if (!this.scheduleForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    if (this.scheduleForm.value['minute'] < 0 || this.scheduleForm.value['minute'] > 59) {
      this.error = 'Minute should be between 0 and 59.';
      return;
    }

    if (this.scheduleForm.value['hour'] < 0 || this.scheduleForm.value['hour'] > 23) {
      this.error = 'Hour should be between 0 and 23.';
      return;
    }

    this.scheduleService.createSchedule(this.scheduleForm.value).pipe().subscribe(res => {
      this.success = 'Schedule has been successfully created!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getSchedules();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  editSchedule() {
    if (!this.editScheduleForm.valid) {
      this.error = 'Please ensure all required fields are captured.';
      return;
    }

    if (this.editScheduleForm.value['minute'] < 0 || this.editScheduleForm.value['minute'] > 59) {
      this.error = 'Minute should be between 0 and 59.';
      return;
    }

    if (this.editScheduleForm.value['hour'] < 0 || this.editScheduleForm.value['hour'] > 23) {
      this.error = 'Hour should be between 0 and 23.';
      return;
    }
    this.scheduleService.editSchedule(this.schedule.id, this.editScheduleForm.value).pipe().subscribe(res => {
      this.success = 'Schedule has been successfully edited!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
      this.getSchedules();
      this.bsModalRef.hide();
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  processTask(task: any) {
    this.taskService.processTask(task.id).pipe().subscribe(res => {
      this.success = 'Task has been processed!'
      this.snackBar.open(this.success, null, this.snackBarConfig);
    }, error => {
      this.snackBar.open(this.errorService.getErrorMessage(error), null, this.snackBarConfig);
    });
  }

  addColumn() {
    this.columnCount += 1;
    const  column = new Column(this.columnCount);
    this.columns.push(column);
  }

  deleteColumn(column: Column) {
    this.columns.splice(this.columns.indexOf(column), 1);
  }

  openTaskModal(): void {
    this.error = null;
    this.success = null;
    const modalOptions = new ModalOptions();
    modalOptions.class = 'modal-xl';
    modalOptions.keyboard = false;
    modalOptions.backdrop = 'static';
    this.taskReconcile = false;
    this.bsModalRef = this.modalService.show(this.taskModal, modalOptions);
  }

  openEditTaskModal(task: any): void {
    this.error = null;
    this.success = null;
    this.task = task;
    const taskEdit = new TaskEdit(task);
    this.taskReconcile = taskEdit.reconcile;
    this.accountInData = taskEdit.accountInData;
    this.taskAmountInData = taskEdit.amountInData;
    this.editTaskForm.patchValue(taskEdit);
    const modalOptions = new ModalOptions();
    modalOptions.class = 'modal-xl';
    modalOptions.keyboard = false;
    modalOptions.backdrop = 'static';
    this.bsModalRef = this.modalService.show(this.editTaskModal, modalOptions);
  }

  openTableModal(): void {
    this.error = null;
    this.success = null;
    const modalOptions = new ModalOptions();
    modalOptions.class = 'modal-xl';
    modalOptions.keyboard = false;
    modalOptions.backdrop = 'static';
    this.bsModalRef = this.modalService.show(this.tableModal, modalOptions);
  }

  openConnectionModal(): void {
    this.error = null;
    this.success = null;
    this.bsModalRef = this.modalService.show(this.connectionModal);
  }

  openEditConnectionModal(connection: any): void {
    this.error = null;
    this.success = null;
    this.connection = connection;
    this.editConnectionForm.patchValue(connection);
    this.bsModalRef = this.modalService.show(this.editConnectionModal);
  }

  openScheduleModal(): void {
    this.error = null;
    this.success = null;
    this.bsModalRef = this.modalService.show(this.scheduleModal);
  }

  openEditScheduleModal(schedule: any): void {
    this.schedule = schedule;
    this.error = null;
    this.success = null;
    this.editScheduleForm.patchValue(schedule);
    this.bsModalRef = this.modalService.show(this.editScheduleModal);
  }

  approveAccount(account: any, approve: boolean) {
    const approvalObject = new ApprovalObject();
    approvalObject.approve = approve;
    console.log(approvalObject)
    this.accountService.approveAccount(account.id, approvalObject).pipe().subscribe((res: any) => {
      this.snackBar.open('Account has been ' + approve ? 'approved!' : 'rejected!', null, this.snackBarConfig);
      this.getAccounts();
    }, error => {
      this.error = this.errorService.getErrorMessage(error);
      this.snackBar.open(this.error, null, this.snackBarConfig);
    });
  }

  viewColumns(table: any) {
    this.table = table;
    const modalOptions = new ModalOptions();
    modalOptions.class = 'modal-lg';
    modalOptions.keyboard = false;
    modalOptions.backdrop = 'static';
    this.bsModalRef = this.modalService.show(this.columnModal, modalOptions);
  }
}

class TaskEdit {
  public id: number;
  public name: string;
  public connectionId: number;
  public tableId: number;
  public scheduleId: number;
  public accountId: number;
  public narration: string;
  public reconcile: boolean;
  public description: string;
  public charge: number;
  public accountInData: boolean;
  public fetchTable: string;
  public fetchColumn: string;
  public accountColumn: string;
  public amountInData: boolean;

  constructor(task: any) {
    this.id = task.id;
    this.name = task.name;
    this.connectionId = task.connection.id;
    this.tableId = task.table.id;
    this.scheduleId = task.schedule.id;
    this.accountId = task.account.id;
    this.narration = task.narration;
    this.reconcile = task.reconcile;
    this.description = task.description;
    this.charge = task.charge;
    this.accountInData = task.accountInData;
    this.amountInData = task.amountInData;
    this.fetchTable = task.fetchTable;
    this.fetchColumn = task.fetchColumn;
    this.accountColumn = task.accountColumn;
  }
}

class Column {
  public name: string;
  public dataType: DataType;
  public dataSize: number;
  public identifier: boolean;
  public reconciliation: boolean;
  public amountField: boolean;
  public unique: boolean;

  constructor(public count: number) {
  }
}
