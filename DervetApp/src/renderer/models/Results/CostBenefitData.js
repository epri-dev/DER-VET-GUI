import _ from 'lodash';
import tinycolor from 'tinycolor2';
import BaseTableData from './BaseTableData';

export default class CostBenefitData extends BaseTableData {
  constructor(data) {
    super('cost_benefit.csv', data, true);
    this.essBaseColor = tinycolor('blue');
    this.essUsedColors = [];
    this.essTypes = ['battery'];
    this.intermittentResourceType = ['pv'];
    this.intermittentResourceBaseColor = tinycolor('yellow');
    this.pvUsedColors = [];
    this.generatorTypes = ['diesel', 'ice'];
    this.generatorBaseColor = tinycolor('grey');
    this.generatorUsedColors = [];
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
    return [this.data[rowNum][1], this.data[rowNum][2]];
  }
  createBarChartTraces() {
    const traces = [];
    const traceX = [this.columnHeaders[1], this.columnHeaders[2]];
    _.forEach(this.data, (rowData) => {
      if (!BaseTableData.isRowNull(rowData)) {
        const valueStream = rowData[0];
        if (valueStream !== 'Lifetime Present Value') {
          // create trace
          const traceTemplate = {
            x: traceX,
            y: [rowData[1], rowData[2]],
            hovertext: `${traceX}`,
            name: valueStream,
            type: 'bar',
          };
          // add color if technology
          // assumes all DER rows are grouped by name
          // if (valueStream.indexOf(':') !== -1) {
          //   const derTag = valueStream.split(':')[0].toLowerCase();
          //   // TODO select BASE color based on tag grouping

          //   // TODO SPIN base color for each unique name
          //   // TODO change darkness of base color for valuestream of given name
          //   traceTemplate.marker = { color: valuestreamColor };
          // }
          // add trace to list
          traces.push(traceTemplate);
        }
      }
    });
    return traces;
  }
}
