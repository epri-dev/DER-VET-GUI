import _ from 'lodash';
import BaseTableData from './BaseTableData';


export default class TimeSeriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, null, ['Start Datetime (hb)', 'Demand Charge Billing Periods']);
    this.heatMapLabels = this.createHeatMapXAxisLabels(0);
  }
  createHeatMapXAxisLabels(yearIndex) {
    const axis = this.timeSeriesDateAxis(yearIndex);
    const heatMapLabels = [];
    let i = 0;
    while (i < axis.length) {
      const label = TimeSeriesData.getFullDate(axis[i]);
      heatMapLabels.push(label);
      i += 24;
    }
    return heatMapLabels;
  }
  energyPriceTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.energyPriceKWh;
  }
  energyPriceHeatMapTraceData(yearIndex) {
    const z = TimeSeriesData.listToMap(this.energyPriceTimeSeriesData(yearIndex));
    const x = this.heatMapLabels;
    const y = Array.from({ length: 24 }, (_, i) => i); // hour begining
    return { x, y, z };
  }
  energyStorageDispatchTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.totalStoragePowerKW;
  }
  essDispatchHeatMapTraceData(yearIndex) {
    const z = TimeSeriesData.listToMap(this.energyStorageDispatchTimeSeriesData(yearIndex));
    const x = this.heatMapLabels;
    const y = Array.from({ length: 24 }, (_, i) => i); // hour begining
    return { x, y, z };
  }
  dispatchData(yearIndex, totalEnergyStorageCap) {
    const tsData = this.columnDataByYear[yearIndex];
    const aggregatedStateOfEnergy = tsData.aggregatedStateOfEnergyKWh;
    const aggregatedStateOfCharge = aggregatedStateOfEnergy.map(i => i / totalEnergyStorageCap);
    // TODO check for market serices (grab prices and reservations)
    return {
      aggregatedStateOfCharge,
      totalStoragePowerKW: tsData.totalStoragePowerKW,
      totalGenerationKW: tsData.totalGenerationKW,
      totalLoadKW: tsData.totalLoadKW,
      netLoadKW: tsData.netLoadKW,
      criticalLoadKW: tsData.criticalLoadKW, // might be undefined
      timeSeriesDateAxis: this.timeSeriesDateAxis(0),
      energyPriceKWh: this.energyPriceTimeSeriesData(0),
    };
  }
  timeSeriesDateAxis(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.startDatetimeHb;
  }
  static getFullDate(text) {
    const yearList = text.match(/\d{4}-\d{2}-\d{2}/g);
    if (yearList.length) {
      return yearList[0];
    }
    return 0;
  }
  static listToMap(list) {
    const data = [[], [], [], [], [], [], [], [], [], [], [], [],
      [], [], [], [], [], [], [], [], [], [], [], []];
    let hourOfDay = 0;
    _.forEach(list, (item) => {
      if (hourOfDay === 24) {
        hourOfDay = 0;
      }
      data[hourOfDay].push(item);
      hourOfDay += 1;
    });

    return data;
  }
}

