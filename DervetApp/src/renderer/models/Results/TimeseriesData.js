import BaseTableData from './BaseTableData';

export default class TimeSeriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, null, ['Start Datetime (hb)', 'Demand Charge Billing Periods']);
  }
  energyTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.aggregatedStateOfEnergyKWh;
  }
  energyPriceTimeSeriesData(yearIndex) {
    // TODO we need dervet to output this always
    const tsData = this.columnDataByYear[yearIndex];
    return tsData;
  }
  energyStorageDispatchTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.totalStoragePowerKW;
  }
  marketServicesTimeSeriesData(yearIndex) {
    // TODO
    const tsData = this.columnDataByYear[yearIndex];
    return tsData;
  }
  powerFlowsTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return {
      totalStoragePowerKW: tsData.totalStoragePowerKW,
      totalGenerationKW: tsData.totalGenerationKW,
      totalLoadKW: tsData.totalLoadKW,
      totalGenerationKW: tsData.totalGenerationKW,
      netLoadKW: tsData.netLoadKW,
      criticalLoadKW: tsData.criticalLoadKW, // might be undefined
    };
  }
  yAxis(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.startDatetimeHb;
  }
}

