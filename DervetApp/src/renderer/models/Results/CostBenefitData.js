import tinycolor from 'tinycolor2';
import BaseTableData from './BaseTableData';

export class CostBenefitData extends BaseTableData {
  constructor(data) {
    super('cost_benefit.csv', data, true);
    this.ess_colors = ['#326581', '#6ca6c6', '#a2c7db'];
    this.ess_types = ['battery'];
    this.intermittent_resource_type = ['pv'];
    this.intermittent_resource_colors = ['#807019', '#c0a926'];
    this.generator_types = ['diesel', 'ice'];
    this.generator_colors = ['#393939', '#6a6a6a', '#999999', '#bfbfbf'];
  }
  summaryData() {
    // look for row with 'Lieftime Present Value' in first index and return rest of row
    let rowNum = 0;
    while (rowNum < this.data.length) {
      if (this.data[rowNum][0] === 'Lifetime Present Value') {
        break;
      }
      rowNum += 1;
    }
    return this.data[rowNum].splice(1);
  }
  createBarChartTraces() {
    const traces = [];
    let rowNum = 0;
    while (rowNum < this.data.length) {
      const valueStream = this.data[rowNum][0];
      if (valueStream !== 'Lifetime Present Value') {
        // create trace
        const traceTemplate = {
          x: [this.columnHeaders[1], this.columnHeaders[2]],
          y: [0, 6e5],
          name: valueStream,
          type: 'bar',
        };
        // add color if technology
        if (valueStream.indexOf(':') !== -1) {
          const derTag = valueStream.split(':')[0].toLowerCase();
          // select color based on tag grouping TODO

        }
        // add trace to list
        traces.pop(traceTemplate);
      }
      rowNum += 1;
    }
    return traces;
  }
}

export const costBenefitArrayData = [
  ['', 'Cost ($)', 'Benefit ($)'],
  ['Lifetime Present Value', 210000000, 390000000],
  ['BATTERY: ess1 Capital Cost', 2e5, 0],
  ['BATTERY: ess1 Fixed O&M', 4e5, 0],
  ['BATTERY: ess1 Variable O&M', 3e5, 0],
  ['PV: rooftop Capital Cost', 9e5, 0],
  ['PV: rooftop Fixed O&M', 4e5, 0],
  ['ICE: gen set Capital Cost', 3e5, 0],
  ['ICE: gen set Fixed O&M', 8e5, 0],
  ['ICE: gen set Variable O&M', 1e5, 0],
  ['ICE: gen set Fuel', 4e5, 0],
  ['Avoided Demand Charge', 0, 6e5],
  ['Avoided Energy Charge', 0, 7e5],
  ['Spinning Reserves', 0, 9e5],
  ['Non-Spinning Reserves', 0, 6e5],
  ['Day Ahead ETS', 0, 8e5],
];

export const costBenefitSummaryData = [210000000, 390000000];
const costBenefitXAxis = ['Costs ($)', 'Benefit ($)'];
export const costBenefitTraces = [
  {
    x: costBenefitXAxis,
    y: [2e5, 0],
    name: 'BATTERY: ess1 Capital Cost',
    marker: { color: '#326581' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [4e5, 0],
    name: 'BATTERY: ess1 Fixed O&M',
    marker: { color: '#6ca6c6' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [3e5, 0],
    name: 'BATTERY: ess1 Variable O&M',
    marker: { color: '#a2c7db' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [9e5, 0],
    name: 'PV: rooftop Capital Cost',
    marker: { color: '#807019' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [4e5, 0],
    name: 'PV: rooftop Fixed O&M',
    marker: { color: '#c0a926' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [3e5, 0],
    name: 'ICE: gen set Capital Cost',
    marker: { color: '#393939' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [8e5, 0],
    name: 'ICE: gen set Fixed O&M',
    marker: { color: '#6a6a6a' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [1e5, 0],
    name: 'ICE: gen set Variable O&M',
    marker: { color: '#999999' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [4e5, 0],
    name: 'ICE: gen set Fuel',
    marker: { color: '#bfbfbf' },
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [0, 6e5],
    name: 'Avoided Demand Charge',
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [0, 7e5],
    name: 'Avoided Energy Charge',
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [0, 9e5],
    name: 'Spinning Reserves',
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [0, 6e5],
    name: 'Non-Spinning Reserves',
    type: 'bar',
  },
  {
    x: costBenefitXAxis,
    y: [0, 8e5],
    name: 'Day Ahead ETS',
    type: 'bar',
  },
];
