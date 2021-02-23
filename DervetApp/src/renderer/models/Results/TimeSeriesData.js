import _ from 'lodash';
import BaseTableData from './BaseTableData';

export default class TimeSeriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, null, ['Start Datetime (hb)', 'Demand Charge Billing Periods']);
    this.heatMapLabels = this.createHeatMapXAxisLabels(0);
    this.abovePoiPowerColumnNames = [
      'System Load (kW)',
      'Net Load (kW)',
      'Deferral: Load (kW)',
    ];
    this.internalPowerColumnNames = [
      'Total Original Load (kW)',
      'Total Load (kW)',
      'Total Generation (kW)',
      'Total Storage Power (kW)',
      'Critical Load (kW)',
      'Deferral: Power Requirement (kW)',
    ];
    this.marketPriceColumnNames = [
      'FR Up Price ($/kW)',
      'FR Down Price ($/kW)',
      'LF Up Price ($/kW)',
      'LF Down Price ($/kW)',
      'SR Price ($/kW)',
      'NSR Price ($/kW)',
    ];
    this.reservationDownChargingColumnNames = [
      'Spinning Reserve Down (Charging) (kW)',
      'Non-spinning Reserve Down (Charging) (kW)',
      'Frequency Regulation Down (Charging) (kW)',
      'Load Following Down (Charging) (kW)',
    ];
    this.reservationDownDischaringColumnNames = [
      'Spinning Reserve Down (Discharging) (kW)',
      'Non-spinning Reserve Down (Discharging) (kW)',
      'Frequency Regulation Down (Discharging) (kW)',
      'Load Following Down (Discharging) (kW)',
    ];
    this.reservationUpChargingColumnNames = [
      'Frequency Regulation Up (Charging) (kW)',
      'Load Following Up (Charging) (kW)',
    ];
    this.reservationUpDischargingColumnNames = [
      'Frequency Regulation Up (Discharging) (kW)',
      'Load Following Up (Discharging) (kW)',
    ];
    /* Other columns that could be plotted:
    'Deferral: Energy Requirement (kWh)'
    'Backup Energy Reserved (kWh)'
    'Demand Charge Billing Periods'
    'DR Possible Event (y/n)'
    'RA Event (y/n)'
    'User-POI: max export (kW)'
    'User-POI: min export (kW)'
    'User-POI: max import (kW)'
    'User-POI: min import (kW)'
    'User-Aggregate Energy Max (kWh)'
    'User-Aggregate Energy Min (kWh)'
    'Total Critical Load (kWh)'
    */
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
    let aggregatedStateOfCharge = null;
    if (totalEnergyStorageCap) {
      const aggregatedStateOfEnergy = tsData.aggregatedStateOfEnergyKWh;
      aggregatedStateOfCharge = aggregatedStateOfEnergy.map(i => i / totalEnergyStorageCap);
    }

    const otherPower = this.grabDataColumns(this.internalPowerColumnNames, yearIndex, 5);
    const poiPower = this.grabDataColumns(this.abovePoiPowerColumnNames, yearIndex, 5);
    const reservations = [
      ...this.grabDataColumns(this.reservationUpDischargingColumnNames, yearIndex, 19, true),
      ...this.grabDataColumns(this.reservationDownDischaringColumnNames, yearIndex, 19, true),
      ...this.grabDataColumns(this.reservationUpChargingColumnNames, yearIndex, 16),
      ...this.grabDataColumns(this.reservationDownChargingColumnNames, yearIndex, 16),
    ];
    const marketPrices = this.grabDataColumns(this.marketPriceColumnNames, yearIndex, 7);
    const hasReservations = Boolean(marketPrices.length);
    return {
      aggregatedSOC: {
        data: aggregatedStateOfCharge,
        label: 'Aggregate ESS SOC',
      },
      internalPower: otherPower,
      poiPower,
      timeSeriesDateAxis: this.timeSeriesDateAxis(0),
      energyPrice: {
        data: this.energyPriceTimeSeriesData(0),
        label: 'Energy Price',
      },
      marketPrices,
      hasReservations,
      reservations,
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

  grabDataColumns(originalColumnNameList, yearIndex, dropLength = 0, makeNegative = false) {
    const columnData = [];
    const tsData = this.columnDataByYear[yearIndex];
    _.forEach(originalColumnNameList, (col) => {
      const dataName = BaseTableData.toCamelCaseString(col);
      const data = tsData[dataName];
      if (data !== undefined) {
        const label = dropLength ? col.slice(0, -dropLength) : col;
        if (makeNegative) {
          const negativeData = _.map(data, val => (val * -1));
          columnData.push({ data: negativeData, label });
        } else {
          columnData.push({ data, label });
        }
      }
    });
    return columnData;
  }
}
