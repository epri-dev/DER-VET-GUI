const headers = ['DER', 'Energy Rating (kWh)', 'Charge Rating (kW)', 'Discharge Rating (kW)', 'Round Trip Efficiency (%)', 'Lower Limit on SOC (%)', 'Upper Limit on SOC (%)', 'Duration (hours)', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)', 'Power Capacity (kW)', 'Quantity'];

export const zeroDischargeBattery = {
  systemName: 'bess 1',
  energyRatingKWh: 61,
  chargeRatingKW: 0,
  dischargeRatingKW: 0,
  roundTripEfficiency: 0.91,
  lowerLimitOnSOC: 0,
  upperLimitOnSOC: 1,
  durationHours: 0,
  capitalCost: 0,
  capitalCostKW: 800,
  capitalCostKWh: 250,
  quantity: 1,
};

export const zeroDischargeBatteryCostTable = {
  items: [
    {
      label: 'Total Cost',
      total: '$15,250',
    },
    {
      label: 'Cost per Unit',
      subTotal: '$0',
    },
    {
      strEquation: '1 x $0',
      subTotal: '=',
    },
    {
      label: 'Cost per kW',
      subTotal: '$0',
    },
    {
      strEquation: '0kW x $800/kW',
      subTotal: '=',
    },
    {
      label: 'Cost per kWh',
      subTotal: '$15,250',
    },
    {
      strEquation: '61kWh x $250/kWh',
      subTotal: '=',
    },
  ],
  name: 'bess 1',
};

export const sizeArrayData = [
  headers,
  ['Storage', 19477, 2303, 2303, 0.85, 0.05, 1.0, 8.457, 1000, 800, 250, null, null],
  ['Solar PV', null, null, null, null, null, null, null, null, 1660, null, 3000, null],
  ['Generators', null, null, null, null, null, null, null, 750, 245, null, 1000, 3],
  [null],
];

export const rawParsedDataTwoBatteries = [
  headers,
  ['bess 1', 61, 0, 0, 0.91, 0, 1, 0, 0, 800, 250, null],
  ['bess 2', 101, 162, 162, 0.91, 0, 1, 0.6234567901234568, 0, 800, 250, null],
  ['installation 1', null, null, null, null, null, null, null, null, 1660, null, 1000],
  ['Site Load', null, null, null, null, null, null, 0, null, null, null, 0],
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
    capitalCostKWh: 250,
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

export const sizeTableExpectedFields = [
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
    label: 'Duration (hours)',
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

export const sizeTableExpectedFields1 = [
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
    label: 'Duration (hours)',
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

export const sizeTableExpectedFields2 = [
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
