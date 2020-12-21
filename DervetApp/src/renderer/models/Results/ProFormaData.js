import { formatYAxisCurrency } from '@/util/chart';
import BaseTableData from './BaseTableData';

export default class ProFormaData extends BaseTableData {
  constructor(data) {
    super('pro_forma.csv', data, true);
  }
  createTable() {
    // create fields
    const dataColumns = [];
    const keys = [];
    let i = 0;
    while (i < this.columnHeaders.length) {
      const colString = this.columnHeaders[i];
      if (colString !== null) {
        const camelCol = BaseTableData.toCamelCaseString(colString);
        keys.push(camelCol);
        const fieldTemplate = {
          key: camelCol,
          sortable: true,
          label: colString,
          formatter: (camelCol === 'year') ? null : formatYAxisCurrency,
        };
        dataColumns.push(fieldTemplate);
      }
      i += 1;
    }
    // create data
    const rows = [];
    i = 0; // reset index
    while (i < this.data.length) {
      const rawData = this.data[i];
      if (!BaseTableData.isRowNull(rawData)) {
        const rowTamplate = {};
        let nameIndex = 0;
        while (nameIndex < dataColumns.length) {
          const value = rawData[nameIndex];
          if (value !== 0) {
            rowTamplate[keys[nameIndex]] = value;
          }
          nameIndex += 1;
        }
        rows.push(rowTamplate);
      }
      i += 1;
    }
    return {
      data: rows,
      fields: dataColumns,
    };
  }
}
