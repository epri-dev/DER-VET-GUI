import BaseTableData from './BaseTableData';

export default class OutageEnergyContributionData extends BaseTableData {
  constructor(data) {
    super('outage_energy_contributions.csv', data, true, true, null, ['Start Datetime (hb)']);
  }
}

