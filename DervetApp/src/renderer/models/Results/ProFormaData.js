import { formatYAxisCurrency } from '../../util/chart';
import BaseTableData from './BaseTableData';

export class ProFormaData extends BaseTableData {
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
      const camelCol = BaseTableData.toCamelCaseString(colString);
      keys.push(camelCol);
      const fieldTemplate = {
        key: camelCol,
        sortable: true,
        label: colString,
        formatter: (camelCol === 'year') ? null : formatYAxisCurrency,
      };
      dataColumns.push(fieldTemplate);
      i += 1;
    }
    // create data
    const rows = [];
    i = 0; // reset index
    while (i < this.data.length) {
      const rawData = this.data[i];
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
      i += 1;
    }
    return {
      data: rows,
      fields: dataColumns,
    };
  }
}

export const proFormaArrayData = [
  ['Year', 'Storage Capital Cost', 'Solar PV Capital Cost', 'Storage Fixed O&M Cost', 'Storage Variable O&M Cost', 'Solar PV Fixed O&M Cost', 'Avoided Demand Charge', 'Avoided Energy Charge'],
  ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
  [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
];

export const proFormaTableData = [
  {
    year: 'CAPEX YEAR',
    storageCapitalCost: -6711650,
    solarPVCapitalCost: -1660000,
  },
  {
    year: 2017,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
  {
    year: 2018,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
  {
    year: 2019,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
  {
    year: 2020,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
  {
    year: 2021,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
  {
    year: 2022,
    storageFixedOMCost: -23030,
    storageVariableOMCost: -23030,
    solarPVFixedOMCost: -23030,
    avoidedDemandCharge: 23030,
    avoidedEnergyCharge: 23030,
  },
];

export const proFormaTableFields = [
  {
    key: 'year',
    sortable: true,
    label: 'Year',
    formatter: null,
  },
  {
    key: 'storageCapitalCost',
    sortable: true,
    label: 'Storage Capital Cost',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'solarPVCapitalCost',
    sortable: true,
    label: 'Solar PV Capital Cost',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'storageFixedOMCost',
    sortable: true,
    label: 'Storage Fixed O&M Cost',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'storageVariableOMCost',
    sortable: true,
    label: 'Storage Variable O&M Cost',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'solarPVFixedOMCost',
    sortable: true,
    label: 'Solar PV Fixed O&M Cost',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'avoidedDemandCharge',
    sortable: true,
    label: 'Avoided Demand Charge',
    formatter: formatYAxisCurrency,
  },
  {
    key: 'avoidedEnergyCharge',
    sortable: true,
    label: 'Avoided Energy Charge',
    formatter: formatYAxisCurrency,
  },
];
