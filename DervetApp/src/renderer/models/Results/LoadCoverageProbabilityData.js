import BaseTableData from './BaseTableData';

export default class LoadCoverageProbabilityData extends BaseTableData {
  constructor(data) {
    super('load_coverage_prob.csv', data, true, true);
  }
}
