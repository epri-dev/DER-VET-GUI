// import { ProFormaData, toCamelCaseString } from '@/models/Results/ProFormaData';
// import formatYAxisCurrency from '@/util/chart';

// describe('ProFormaData model', () => {
//   const testCsv = [
//     ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
//     [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
//   ];
//   const actualData = new ProFormaData(testCsv);

//   it('should load data and column headers', () => {
//     const expectedData = [
//       ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
//       [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
//       [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
//       [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
//       [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
//       [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
//       [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
//     ];

//     expect(actualData.data).to.eql(expectedData);
//     expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
//   });

//   const tableObject = actualData.createTableData();
//   it('should create the correct size data objects to create a table', () => {
//     const expectedData = [
//     {
//       systemName: 'Storage',
//       dischargeRating: 2303,
//       chargeRating: 2303,
//       energyRating: 19477,
//       duration: 8.457,
//       quantity: 1,
//       capitalCost: 1000,
//       capitalCostkW: 800,
//       capitalCostkWh: 250,
//     },
//     {
//       systemName: 'Solar PV',
//       powerCapacity: 3000,
//       quantity: 1,
//       capitalCostkW: 1660,
//     },
//     {
//       systemName: 'Generators',
//       powerCapacity: 1000,
//       quantity: 3,
//       capitalCost: 750,
//       capitalCostkW: 245,
//     },
//   ];

//     let i = 0;
//     while (i < tableObject.data.length) {
//       expect(expectedData[i]).to.eql(tableObject.data[i]);
//       i += 1;
//     }
//   });

//   it('should create the correct cost data objects to create a table', () => {
//     const expectedData = [

//     ];

//     let i = 0;
//     while (i < tableObject.data.length) {
//       expect(expectedData[i]).to.eql(tableObject.data[i]);
//       i += 1;
//     }
//   });
// });
