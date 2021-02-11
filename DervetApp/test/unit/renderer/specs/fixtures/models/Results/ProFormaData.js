import { formatYAxisCurrency } from '@/util/chart';

export const proFormaArrayData = [
  ['Year', 'Storage Capital Cost', 'Solar PV Capital Cost', 'Storage Fixed O&M Cost', 'Storage Variable O&M Cost', 'Solar PV Fixed O&M Cost', 'Avoided Demand Charge', 'Avoided Energy Charge'],
  ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
  [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
  [null],
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
