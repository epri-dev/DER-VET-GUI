import BaseTableData from './BaseTableData';

export default class BeforeAndAfterMonthlyBillData extends BaseTableData {
  constructor(data) {
    super('simple_monthly_bill.csv', data, true, true, 'Month-Year', ['Billing Period']);
  }
}
