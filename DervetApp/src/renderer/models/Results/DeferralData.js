import BaseTableData from './BaseTableData';

export class DeferralData extends BaseTableData {
  constructor(data) {
    super('deferral_results.csv', data, true, true);
  }
  createBarChart() {
    const chartData = this.getFirstYearChartData();
    return {
      yearValues: chartData.year,
      powerValues: chartData.powerCapacityRequirementKW,
      energyValues: chartData.energyCapacityRequirementKWh,
    };
  }
}

export const deferralArrayData = [
  ['Year', 'Power Capacity Requirement (kW)', 'Energy Capacity Requirement (kWh)'],
  ['2017', '0.0', '0.0'],
  ['2018', '3678.1711256831004', '44557.96555596632'],
  ['2019', '3678.1711256831004', '44557.96555596632'],
  ['2020', '3678.1711256831004', '44557.96555596632'],
  ['2021', '3678.1711256831004', '44557.96555596632'],
  ['2022', '3678.1711256831004', '44557.96555596632'],
  ['2023', '3678.1711256831004', '44557.96555596632'],
  ['2024', '3678.1711256831004', '44557.96555596632'],
  ['2025', '3678.1711256831004', '44557.96555596632'],
  ['2026', '3678.1711256831004', '44557.96555596632'],
  ['2027', '3678.1711256831004', '44557.96555596632'],
  ['2028', '3678.1711256831004', '44557.96555596632'],
  ['2029', '3678.1711256831004', '44557.96555596632'],
  ['2030', '3678.1711256831004', '44557.96555596632'],
  ['2031', '3678.1711256831004', '44557.96555596632'],
  ['2032', '3985.7345481967623', '53757.97589547943'],
  ['2033', '4299.449239160698', '63398.80396926342'],
  ['2034', '4619.438223943913', '73280.86905941693'],
  ['2035', '4945.826988422792', '96405.41048699943'],
  ['2036', '5278.743528191248', '139161.52005703872'],
  ['2037', '5618.318398755073', '302054.8047520737'],

];

const powerCapacityValues = [
  0.0,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3678.1711256831004,
  3985.7345481967623,
  4299.449239160698,
  4619.438223943913,
  4945.826988422792,
  5278.743528191248,
  5618.318398755073,
];
const energyCapacityValues = [
  0.0,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  44557.96555596632,
  53757.97589547943,
  63398.80396926342,
  73280.86905941693,
  96405.41048699943,
  139161.52005703872,
  302054.8047520737,
];
const yearLabels = Array.from({ length: 21 }, (_, i) => i + 2017);

export const deferralDefaultData = {
  year: yearLabels,
  powerCapacityRequirementKW: powerCapacityValues,
  energyCapacityRequirementKWh: energyCapacityValues,
};

export const deferralData = {
  years: deferralDefaultData.year,
  essName: 'sto1',
  chartData: [{
    type: 'Power',
    units: '(kW)',
    essValue: 4320,
    requirementValues: deferralDefaultData.powerCapacityRequirementKW,
  },
  {
    type: 'Energy',
    units: '(kWh)',
    essValue: 23400,
    requirementValues: deferralDefaultData.energyCapacityRequirementKWh,
  }],
};

