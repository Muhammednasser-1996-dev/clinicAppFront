export enum Apis {

  LOGIN = "auth/login",
  CAHIER_LOAD_DATA = "cashier/load",
  CAHIER_SYNC_DATA = "cashier/sync",
  CAHIER_SEARCH_CONTACT = "cashier/search-contact",
  CAHIER_LOAD_LAST_CONTACT_TRANSACTIONS = "cashier/get-last-contact-transactions",
  CASH_REGISTER_OPEN = "cash-register/open",
  CASH_REGISTER_CLOSE = "cash-register/close",
  CASH_REGISTER_VIEW = "cash-register/view",
  CASH_REGISTER_DETAILS = "cash-register",
  CASHIER_SALES = "cashier/sales",
  ADMIN_BUSINESS_UPDATE = "business/update",
  ADMIN_BUSINESS_UPDATE_LOGO = "business/update-logo",

  ADMIN_SALES = "pos",
  ADMIN_SALES_DESTROY = "pos/destroy",
  ADMIN_SALES_CONTACT = "pos/contact",
  ADMIN_SALES_PRINT_WAREHOUSE_RECEIPT = "pos-print-warehouse-receipt",

  ADMIN_PURCHASE = "purchases",
  ADMIN_PURCHASE_STORE = "purchases",
  ADMIN_PURCHASE_DESTROY = "purchases/destroy",

  ADMIN_RETURN_SALES = "return-sales",
  ADMIN_RETURN_SALES_STORE = "return-sales",
  ADMIN_RETURN_SALES_DESTROY = "return-sales/destroy",

  ADMIN_RETURN_PURCHASES = "return-purchases",
  ADMIN_RETURN_PURCHASES_STORE = "return-purchases",
  ADMIN_RETURN_PURCHASES_DESTROY = "return-purchases/destroy",


  ADMIN_STOCK_ADJUSTMENTS = "stock-adjustments",
  ADMIN_STOCK_ADJUSTMENTS_STORE = "stock-adjustments",
  ADMIN_STOCK_ADJUSTMENTS_DESTROY = "stock-adjustments/destroy",

  ADMIN_STOCK_TRANSFERS = "stock-transfers",
  ADMIN_STOCK_TRANSFERS_STORE = "stock-transfers",
  ADMIN_STOCK_TRANSFERS_DESTROY = "stock-transfers/destroy",


  ADMIN_STORE_INVENTORY = "store-inventory",
  ADMIN_STORE_INVENTORY_STORE = "store-inventory",
  ADMIN_STORE_INVENTORY_DESTROY = "store-inventory/destroy",
  ADMIN_STORE_INVENTORY_PRODUCTS = "store-inventory/products",

  ADMIN_PRODUCT_STORE = "products",
  ADMIN_PRODUCT_STOCK = "products/get-product-stock",

  ADMIN_USERS = "users",
  ADMIN_USERS_STORE = "users",
  ADMIN_USERS_DESTROY = "users/destroy",

  ADMIN_ROLES = "roles",
  ADMIN_ROLES_STORE = "roles",
  ADMIN_ROLES_DESTROY = "roles/destroy",


  // accounts routes

  ADMIN_ACCOUNTS = "accounts",
  ADMIN_ACCOUNTS_EXPENSE = "accounts/expenses",
  ADMIN_ACCOUNTS_STORE = "accounts",
  ADMIN_ACCOUNTS_PAY = "accounts/pay",
  ADMIN_ACCOUNTS_MAP = "accounts/account-map",
  ADMIN_ACCOUNTS_DESTROY = "accounts/delete",
  ADMIN_ACCOUNTS_DEFAULT = "accounts/load-default-accounts",

  ADMIN_INCOMELISTS = "incomelist",
  ADMIN_INCOMELISTS_STORE = "incomelist",
  ADMIN_INCOMELISTS_DESTROY = "incomelist/delete",

  ADMIN_JOURNAL_LIST = "journal-entry",
  ADMIN_JOURNAL_LIST_STORE = "journal-entry",
  ADMIN_JOURNAL_LIST_DESTROY = "journal-entry/delete",


  ADMIN_ACCOUNTING_REPORT_LEDGER = "ledger",
  ADMIN_ACCOUNTING_REPORT_INCOMESTATMENT = "income-statment",
  ADMIN_ACCOUNTING_REPORT_TRIAL_BALANCE = "trial-balance",


  // hr routes
  ADMIN_HR_DEPARTMENTS = "hr/departments",
  ADMIN_HR_DEPARTMENTS_STORE = "hr/departments",
  ADMIN_HR_DEPARTMENTS_DESTROY = "hr/departments/delete",


  //security routes
  ADMIN_SECURITY_ACIVITY_LOG = "sc/log-activity",
  ADMIN_SECURITY_MYLOGIN_HISTORY = "sc/my-login-history",
  ADMIN_SECURITY_ACIVITY_LOG_DESTROY = "sc/log-activity/destroy",
  ADMIN_SECURITY_ALLLOGIN_HISTORY = "sc/all-login-history",
  ADMIN_SECURITY_ALLLOGIN_HISTORY_DESTROY = "sc/all-login-history/destroy",
  ADMIN_SECURITY_CHANGE_PASSWORD = "sc/change-password",
  ADMIN_SECURITY_ADD_BLOCK = "sc/block-list",
  ADMIN_SECURITY_REMOVE_BLOCK = "sc/block-list",
  ADMIN_SECURITY_ALL_BLOCK = "sc/block-list",
  ADMIN_SECURITY_TRACK_INVOICE = "sc/track-invoice",
  ADMIN_SECURITY_FORMAT_FACTORY = "sc/format-factory",



  ADMIN_HR_ADMINISTRATIONS = "hr/administrations",
  ADMIN_HR_ADMINISTRATIONS_STORE = "hr/administrations",
  ADMIN_HR_ADMINISTRATIONS_DESTROY = "hr/administrations/delete",

  ADMIN_HR_HOLIDAY_TYPES = "hr/holiday-types",
  ADMIN_HR_HOLIDAY_TYPES_STORE = "hr/holiday-types",
  ADMIN_HR_HOLIDAY_TYPES_DESTROY = "hr/holiday-types/delete",

  ADMIN_HR_LEAVE_TYPES = "hr/leave-types",
  ADMIN_HR_LEAVE_TYPES_STORE = "hr/leave-types",
  ADMIN_HR_LEAVE_TYPES_DESTROY = "hr/leave-types/delete",

  ADMIN_HR_SHIFTS = "hr/shifts",
  ADMIN_HR_SHIFTS_STORE = "hr/shifts",
  ADMIN_HR_SHIFTS_DESTROY = "hr/shifts/delete",

  ADMIN_HR_HOLIDAY = "hr/holidays",
  ADMIN_HR_HOLIDAY_STORE = "hr/holidays",
  ADMIN_HR_HOLIDAY_DESTROY = "hr/holidays/delete",

  ADMIN_HR_LEAVES = "hr/leaves",
  ADMIN_HR_LEAVES_STORE = "hr/leaves",
  ADMIN_HR_LEAVES_DESTROY = "hr/leaves/delete",

  // hr employees
  ADMIN_HR_EMPLOYEES = "hr/employees",
  ADMIN_HR_EMPLOYEES_STORE = "hr/employees",
  ADMIN_HR_EMPLOYEES_DESTROY = "hr/employees/destroy",

  // reports
  ADMIN_REPORTS_STOCK_REPORT = "reports/stock-report",
  ADMIN_REPORTS_PRODUCT_SALES_REPORT = "reports/product-sales-report",
  ADMIN_REPORTS_CUSTOMER_SALES_REPORT = "reports/customer-sales-report",
  ADMIN_REPORTS_CATEGORY_SALES_REPORT = "reports/category-sales-report",
  ADMIN_REPORTS_BRAND_SALES_REPORT = "reports/brand-sales-report",
  ADMIN_REPORTS_TABLE_SALES_REPORT = "reports/res-table-sales-report",
  ADMIN_REPORTS_CUSTOMERS_REPORT = "reports/customers-report",
  ADMIN_REPORTS_SUPPLIERS_REPORT = "reports/suppliers-report",
  ADMIN_REPORTS_SALES_REPORT = "reports/sales-report",
  ADMIN_REPORTS_TREND_PRODUCTS_REPORT = "reports/trend-product-report",
  ADMIN_REPORTS_EXPENSES_REPORT = "reports/expenses-report",
  ADMIN_REPORTS_DAILY_REPORT = "reports/daily-report",
  ADMIN_REPORTS_MONTH_REPORT = "reports/month-report",
  ADMIN_REPORTS_PROFIT_REPORT = "reports/profit-report",
  ADMIN_REPORTS_FINAL_REPORT = "reports/final-report",
  ADMIN_REPORTS_ITEM_REPORT = "reports/items-report",
  ADMIN_REPORTS_CONTACT_REPORT = "reports/contacts-report",


  // installment

  ADMIN_INSTALLMENT = "installments",
  ADMIN_INSTALLMENT_STORE = "installments",
  ADMIN_INSTALLMENT_DESTROY = "installments/delete",

  // notifications
  ADMIN_NOTIFICATION_TRIGGER = "notifications/trigger",
  ADMIN_NOTIFICATION_LIST = "notifications",
  ADMIN_NOTIFICATION_GET = "notifications/get",
  ADMIN_NOTIFICATION_REMOVE = "notifications/destroy",


  // archive
  ADMIN_ARCHIVE_GET_FOLDERS = "archive/folders",
  ADMIN_ARCHIVE_GET_FILES = "archive/files",
  ADMIN_ARCHIVE_SAVE_FILES = "archive/save-file",
  ADMIN_ARCHIVE_DESTROY_FILES = "archive/destroy",

  // invoice builder
  INVOICE_BUILDER = "invoice-builders",
  INVOICE_BUILDER_SAVE = "invoice-builders",
  INVOICE_BUILDER_DESTROY = "invoice-builders/destroy",

  APPLICATION_META = "app/meta",

}
