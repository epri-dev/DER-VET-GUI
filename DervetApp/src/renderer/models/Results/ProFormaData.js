import _ from 'lodash';
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
    _.forEach(this.columnHeaders, (colString) => {
      if (colString !== null) {
        const camelCol = BaseTableData.toCamelCaseString(colString);
        keys.push(camelCol);
        const fieldTemplate = {
          key: camelCol,
          label: colString,
          formatter: (camelCol === 'year') ? null : formatYAxisCurrency,
        };
        dataColumns.push(fieldTemplate);
      }
    });
    // create data
    const rows = [];
    _.forEach(this.data, (rowData) => {
      if (!BaseTableData.isRowNull(rowData)) {
        const rowTamplate = {};
        let nameIndex = 0;
        while (nameIndex < dataColumns.length) {
          const value = rowData[nameIndex];
          if (value !== 0) {
            rowTamplate[keys[nameIndex]] = value;
          }
          nameIndex += 1;
        }
        rows.push(rowTamplate);
      }
    });
    return {
      data: rows,
      fields: dataColumns,
    };
  }
}
