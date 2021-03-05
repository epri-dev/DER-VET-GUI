import _ from 'lodash';
import pullDateFromDateTime from '@/util/time';
import BaseTableData from './BaseTableData';

export default TRACE_NAMES = {
  // reservations
  spinningReserve: 'Spinning Reserve (kW)',
  nonSpinningReserve: 'Non-Spinning Reserve (kW)',
  frequencyRegulationDown: 'Frequency Regulation Down (kW)',
  frequencyRegulationUp: 'Frequency Regulation Up (kW)',
  loadFollowingDown: 'Load Following Down (kW)',
  loadFollowingUp: 'Load Following Up (kW)',
  // power flows
  totalEssPower: 'Total Storage Power',
  totalGeneration: 'Total Generation',
  totalOriginalLoad: 'Total Original Load',
  totalLoad: 'Total Load',
  netLoad: 'Net Load',
  // state of energy in system/state of charge
  essStateOfCharge: 'Aggregated ESS State of Charge',
  // prices
  energyPrice: 'Energy Price',
  // timeseries axis
  timeSeries: 'Datetime (hb)'
}

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
    this.reservationColumnsNames = [
      // {minuendColumnName, subtrahendColumnName, traceName}
      {
        minuendColumnName: 'Spinning Reserve Down (Disharging) (kW)',
        subtrahendColumnName: 'Spinning Reserve Down (Charging) (kW)',
        traceName: TRACE_NAMES.spinningReserve,
      },
      {
        minuendColumnName: 'Non-spinning Reserve Down (Disharging) (kW)',
        subtrahendColumnName: 'Non-spinning Reserve Down (Charging) (kW)',
        traceName: TRACE_NAMES.nonSpinningReserve,
      },
      {
        minuendColumnName: 'Frequency Regulation Down (Discharging) (kW)',
        subtrahendColumnName: 'Frequency Regulation Down (Charging) (kW)',
        traceName: TRACE_NAMES.frequencyRegulationDown,
      },
      {
        minuendColumnName: 'Frequency Regulation Up (Discharging) (kW)',
        subtrahendColumnName: 'Frequency Regulation Up (Charging) (kW)',
        traceName: TRACE_NAMES.frequencyRegulationUp,
      },
      {
        minuendColumnName: 'Load Following Down (Discharging) (kW)',
        subtrahendColumnName: 'Load Following Down (Charging) (kW)',
        traceName: TRACE_NAMES.loadFollowingDown,
      },
      {
        minuendColumnName: 'Load Following Up (Discharging) (kW)',
        subtrahendColumnName: 'Load Following Up (Charging) (kW)',
        traceName: TRACE_NAMES.loadFollowingUp,
      },
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
      const label = pullDateFromDateTime(axis[i]);
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
    const dataLabelList = [];
    let aggregatedStateOfCharge = null;
    if (totalEnergyStorageCap) {
      const aggregatedStateOfEnergy = tsData.aggregatedStateOfEnergyKWh;
      aggregatedStateOfCharge = aggregatedStateOfEnergy.map(i => i / totalEnergyStorageCap);
    }

    const otherPower = this.grabDataColumns(tsData, this.internalPowerColumnNames, 5);
    const poiPower = this.grabDataColumns(tsData, this.abovePoiPowerColumnNames, 5, true);
    const reservations = this.grabReservationColumnData(tsData);
    const marketPrices = this.grabDataColumns(tsData, this.marketPriceColumnNames, 13);
    return [
      {
        data: aggregatedStateOfCharge,
        label: 'Aggregate ESS SOC',
      },
      ...otherPower,
      ...poiPower,
      TimeSeriesData.dataLabel(this.timeSeriesDateAxis(0), TRACE_NAMES.timeSeries),
      {
        data: this.energyPriceTimeSeriesData(0),
        label: 'Energy Price',
      },
      ...marketPrices,
      ...reservations,
    ];
  }

  timeSeriesDateAxis(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.startDatetimeHb;
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

  static subtractDataArrays(arr1, arr2) {
    return arr1.map((el, i) => el - arr2[i]);
  }

  grabReservationColumnData(tsData) {
    const columnData = [];
    _.forEach(this.reservationColumnsNames, (payload) => {
      const { minuendColumnName, subtrahendColumnName, traceName } = payload;
      console.log(traceName);
      // check if the reservation exists - grab "minuend" amount
      const dischargeDataName = BaseTableData.toCamelCaseString(minuendColumnName);
      const dischargeData = tsData[dischargeDataName];
      if (dischargeData !== undefined) {
        // grab "substrahend" amount
        const chargeDataName = BaseTableData.toCamelCaseString(subtrahendColumnName);
        const chargeData = tsData[chargeDataName];
        const data = TimeSeriesData.subtractDataArrays(dischargeData, chargeData);
        columnData.push(TimeSeriesData.dataLabel(data, traceName));
      }
    });
    return columnData;
  }

  grabDataColumns(tsData, originalColumnNameList, dropLength = 0, makeNegative = false) {
    const columnData = [];
    _.forEach(originalColumnNameList, (col) => {
      const dataName = BaseTableData.toCamelCaseString(col);
      const data = tsData[dataName];
      if (data !== undefined) {
        const label = dropLength ? col.slice(0, -dropLength) : col;
        if (makeNegative) {
          const negativeData = _.map(data, val => (val * -1));
          columnData.push(TimeSeriesData.dataLabel(negativeData, label));
        } else {
          columnData.push(TimeSeriesData.dataLabel(data, label));
        }
      }
    });
    return columnData;
  }

  static dataLabel(data, label) {
    return { data, label };
  }
}
