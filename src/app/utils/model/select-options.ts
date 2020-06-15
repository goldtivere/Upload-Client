export class SelectOptions {
  statusTypes = ['ACTIVE', 'INACTIVE', 'REJECTED', 'DEACTIVATED'];
  roles = ['CLIENT_USER', 'CLIENT_ADMIN'];
  rolesAdmin = ['CLIENT_USER'];
  paymentStatus = ['INITIATED', 'PROCESSED', 'CANCELED', 'FAILED', 'REJECTED'];
  dataTypes = ['BIG_DECIMAL', 'BOOLEAN', 'INTEGER', 'DOUBLE', 'LOCAL_DATE', 'LOCAL_DATETIME', 'VARCHAR'];
  driverTypes = ['MSSQL', 'MYSQL', 'ORACLE', 'POSTGRES'];
  jobPeriods = ['DAILY', 'END_OF_MONTH', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
}
