import BaseTableData from './BaseTableData';

class SizeData extends BaseTableData {
  constructor() {
    super('size.csv', true);
    this.systemNameColumnName = 'System Name';
    this.energyCapacityColumnName = 'Energy Rating (kWh)';
    this.durationColumnName = 'Duration (hours)';

    this.cCostColumnName = 'Capital Cost ($)';
    this.cCostkWColumnName = 'Capital Cost ($/kW)';
    this.cCostkWhColumnName = 'Capital Cost ($/kWh)';

    this.batteryChargeRatingColumnName = 'Charge Rating (kW)'; // this column only exists when Battery has been considered
    this.batteryDischargeRatingColumnName = 'Discharge Rating (kW)'; // this column only exists when Battery has been considered
    this.powerCapacityColumnName = 'Power Capacity (kW)'; // this column only exists when PV and/or ICE has been considered
    this.iceColumnName = 'Quantity'; // this column only exists when ICE has been considered
  }
  set loadDataFromFile(folderPath) {
    this.results_loaded = true;
    // TODO
    return this.results_loaded;
  }
}

export default SizeData;
