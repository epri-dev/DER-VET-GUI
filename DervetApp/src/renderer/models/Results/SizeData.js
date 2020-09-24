import BaseTableData from './BaseTableData';

export const createCostTableData = (rowSizeData) => {
  let costStructure = [];
  let energyCost = 0;
  let powerCost = 0;
  let unitsCost = 0;
  if ('capitalCostKWh' in rowSizeData) {
    const cCostkWh = rowSizeData.capitalCostKWh;
    const energyRating = rowSizeData.energyRatingKWh;
    energyCost = cCostkWh * energyRating;
    const costPerkWh = [
      {
        label: 'Cost per kWh',
        subTotal: `$${energyCost.toLocaleString()}`,
      },
      {
        subTotal: '=',
        strEquation: `${energyRating.toLocaleString()}kWh x $${cCostkWh.toLocaleString()}/kWh`,
      },
    ];
    costStructure = costPerkWh;
  }
  if ('capitalCostKW' in rowSizeData) {
    const cCostkW = rowSizeData.capitalCostKW;
    const powerCapacityKW = rowSizeData.dischargeRatingKW || rowSizeData.powerCapacityKW;
    powerCost = powerCapacityKW * cCostkW;
    const costPerkW = [
      {
        label: 'Cost per kW',
        subTotal: `$${powerCost.toLocaleString()}`,
      },
      {
        subTotal: '=',
        strEquation: `${powerCapacityKW.toLocaleString()}kW x $${cCostkW.toLocaleString()}/kWh`,
      },
    ];
    costStructure = [...costPerkW, ...costStructure];
  }
  if ('capitalCost' in rowSizeData) {
    const cCost = rowSizeData.capitalCost;
    unitsCost = rowSizeData.quantity * cCost;
    const costPerUnit = [
      {
        label: 'Cost per Unit',
        subTotal: `$${unitsCost.toLocaleString()}`,
      },
      {
        subTotal: '=',
        strEquation: `${rowSizeData.quantity} x $${cCost.toLocaleString()}`,
      },
    ];
    costStructure = [...costPerUnit, ...costStructure];
  }
  const total = energyCost + powerCost + unitsCost;
  const totalCost = [
    {
      label: 'Total Cost',
      total: `$${total.toLocaleString()}`,
    },
  ];
  costStructure = [...totalCost, ...costStructure];
  return {
    name: rowSizeData.systemName,
    items: costStructure,
  };
};

export class SizeData extends BaseTableData {
  constructor(data) {
    super('size.csv', data, true);
    // this.sizeColumnsOrdered = ['Discharge Rating (kW)', 'Power Capacity (kW)',
    //   'Charge Rating (kW)', 'Energy Rating (kWh)', 'Duration (hours)', 'Quantity'];
    this.powerCols = ['discharge', 'power', 'charge'];
    this.energyCols = ['energy', 'duration'];
    this.sizeTableDataRows = [];
    this.numPowerCols = 0;
    this.numEnergyCols = 0;
  }
  createDataObject() {
    let rowNum = 0;
    while (rowNum < this.data.length) {
      const rawData = this.data[rowNum];
      const rowTamplate = {
        systemName: rawData[0],
      };
      let nameIndex = 1;
      while (nameIndex < this.columnHeaders.length) {
        const colString = this.columnHeaders[nameIndex];
        const camelCol = BaseTableData.toCamelCaseString(colString);

        const value = rawData[nameIndex];
        if (value !== 0 && value !== null) {
          rowTamplate[camelCol] = value;
        }
        nameIndex += 1;
      }
      if (rowTamplate.quantity === undefined) {
        rowTamplate.quantity = 1;
      }
      this.sizeTableDataRows.push(rowTamplate);
      rowNum += 1;
    }
    return this.sizeTableDataRows;
  }
  static createSortableField(label) {
    return {
      key: BaseTableData.toCamelCaseString(label),
      sortable: true,
      label,
    };
  }
  createSizeTableFields() {
    // this.createDataObject();
    // intialize fields with Name
    const dataColumnsFeilds = [{
      key: BaseTableData.toCamelCaseString('System Name'),
      sortable: true,
      label: 'System Name',
    }];
    // power columns
    let i = 0;
    while (i < this.powerCols.length) {
      const colIndex = this.getColumnIndexThatContains(this.powerCols[i]);
      if (colIndex !== -1) {
        // then the power column exists
        const label = this.columnHeaders[colIndex];
        dataColumnsFeilds.push({
          key: BaseTableData.toCamelCaseString(label),
          sortable: true,
          label,
        });
        this.numPowerCols += 1;
      }
      i += 1;
    }
    // energy columns
    i = 0;
    while (i < this.energyCols.length) {
      const colIndex = this.getColumnIndexThatContains(this.energyCols[i]);
      if (colIndex !== -1) {
        // then the energy column exists
        const label = this.columnHeaders[colIndex];
        dataColumnsFeilds.push({
          key: BaseTableData.toCamelCaseString(label),
          sortable: true,
          label,
        });
        this.numEnergyCols += 1;
      }
      i += 1;
    }
    // quantity column
    dataColumnsFeilds.push({
      key: BaseTableData.toCamelCaseString('Quantity'),
      sortable: true,
      label: 'Quantity',
    });

    return dataColumnsFeilds;
  }
  createCostTables() {
    let i = 0;
    const tableData = [];
    while (i < this.sizeTableDataRows.length) {
      const rowData = createCostTableData(this.sizeTableDataRows[i]);
      tableData.push(rowData);
      i += 1;
    }
    return tableData;
  }
}

export const sizeArrayData = [
  ['DER', 'Energy Rating (kWh)', 'Charge Rating (kW)', 'Discharge Rating (kW)', 'Round Trip Efficiency (%)', 'Lower Limit on SOC (%)', 'Upper Limit on SOC (%)', 'Duration (hours)', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)', 'Power Capacity (kW)', 'Quantity'],
  ['Storage', 19477, 2303, 2303, 0.85, 0.05, 1.0, 8.457, 1000, 800, 250, null, null],
  ['Solar PV', null, null, null, null, null, null, null, null, 1660, null, 3000, null],
  ['Generators', null, null, null, null, null, null, null, 750, 245, null, 1000, 3],
];

export const sizeTableExpectedData = [
  {
    systemName: 'Storage',
    dischargeRatingKW: 2303,
    chargeRatingKW: 2303,
    energyRatingKWh: 19477,
    durationHours: 8.457,
    quantity: 1,
    capitalCost: 1000,
    capitalCostKW: 800,
    capitalCostkWh: 250,
    roundTripEfficiency: 0.85,
    lowerLimitOnSOC: 0.05,
    upperLimitOnSOC: 1.0,
  },
  {
    systemName: 'Solar PV',
    powerCapacityKW: 3000,
    quantity: 1,
    capitalCostKW: 1660,
  },
  {
    systemName: 'Generators',
    powerCapacityKW: 1000,
    quantity: 3,
    capitalCost: 750,
    capitalCostKW: 245,
  },
];

export const sizeTableExpectedFeilds = [
  {
    key: 'systemName',
    sortable: true,
    label: 'System Name',
  },
  {
    key: 'dischargeRatingKW',
    sortable: true,
    label: 'Discharge Rating (kW)',
  },
  {
    key: 'powerCapacityKW',
    sortable: true,
    label: 'Power Capacity (kW)',
  },
  {
    key: 'chargeRatingKW',
    sortable: true,
    label: 'Charge Rating (kW)',
  },
  {
    key: 'energyRatingKWh',
    sortable: true,
    label: 'Energy Rating (kWh)',
  },
  {
    key: 'durationHours',
    sortable: true,
    label: 'Duartion (hours)',
  },
  {
    key: 'quantity',
    sortable: true,
    label: 'Quantity',
  },
];

export const sizeArrayData1 = [
  ['DER', 'Energy Rating (kWh)', 'Charge Rating (kW)', 'Discharge Rating (kW)', 'Round Trip Efficiency (%)', 'Lower Limit on SOC (%)', 'Upper Limit on SOC (%)', 'Duration (hours)', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)'],
  ['Storage', 19477, 2303, 2303, 0.85, 0.05, 1.0, 8.457, 1000, 800, 250],
];

export const sizeTableExpectedData1 = [
  {
    systemName: 'Storage',
    dischargeRatingKW: 2303,
    chargeRatingKW: 2303,
    energyRatingKWh: 19477,
    durationHours: 8.457,
    quantity: 1,
    capitalCost: 1000,
    capitalCostKW: 800,
    capitalCostKWh: 250,
    roundTripEfficiency: 0.85,
    lowerLimitOnSOC: 0.05,
    upperLimitOnSOC: 1.0,
  },
];

export const sizeTableExpectedFeilds1 = [
  {
    key: 'systemName',
    sortable: true,
    label: 'System Name',
  },
  {
    key: 'dischargeRatingKW',
    sortable: true,
    label: 'Discharge Rating (kW)',
  },
  {
    key: 'chargeRatingKW',
    sortable: true,
    label: 'Charge Rating (kW)',
  },
  {
    key: 'energyRatingKWh',
    sortable: true,
    label: 'Energy Rating (kWh)',
  },
  {
    key: 'durationHours',
    sortable: true,
    label: 'Duartion (hours)',
  },
  {
    key: 'quantity',
    sortable: true,
    label: 'Quantity',
  },
];

export const sizeArrayData2 = [
  ['DER', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)', 'Power Capacity (kW)', 'Quantity'],
  ['Solar PV', null, 1660, null, 3000, null],
  ['Generators', 750, 245, null, 1000, 3],
];

export const sizeTableExpectedData2 = [
  {
    systemName: 'Solar PV',
    powerCapacityKW: 3000,
    quantity: 1,
    capitalCostKW: 1660,
  },
  {
    systemName: 'Generators',
    powerCapacityKW: 1000,
    quantity: 3,
    capitalCost: 750,
    capitalCostKW: 245,
  },
];

export const sizeTableExpectedFeilds2 = [
  {
    key: 'systemName',
    sortable: true,
    label: 'System Name',
  },
  {
    key: 'powerCapacityKW',
    sortable: true,
    label: 'Power Capacity (kW)',
  },
  {
    key: 'quantity',
    sortable: true,
    label: 'Quantity',
  },
];
