import _ from 'lodash';
import pullDateFromDateTime from '@/util/time';
import BaseTableData from './BaseTableData';

export default TRACE_NAMES = {
  // reservations
  spinningReserve: 'Spinning Reserve',
  nonSpinningReserve: 'Non-Spinning Reserve',
  frequencyRegulationDown: 'Frequency Regulation Down',
  frequencyRegulationUp: 'Frequency Regulation Up',
  loadFollowingDown: 'Load Following Down',
  loadFollowingUp: 'Load Following Up',
  // power flows
  totalEssPower: 'Total Storage Power',
  totalGeneration: 'Total Generation',
  totalOriginalLoad: 'Total Original Load',
  totalLoad: 'Total Load',
  netLoad: 'Net Load',
  systemLoad: 'System Load',
  deferralLoad: 'Deferral Load',
  critialLoad: 'Critical Load',
  deferralRequirement: 'Deferral Power Requirement',
  // state of energy in system/state of charge
  aggregateEssStateOfCharge: 'Aggregated ESS State of Charge',
  // prices
  energyPrice: 'Energy Price',
  frequencyRegulationUpPrice: 'FR Up Price',
  frequencyRegulationDownPrice: 'FR Down Price',
  loadFollowingUpPrice: 'LF Up Price',
  loadFollowingDownPrice: 'LF Down Price',
  spinningReservePrice: 'SR Price',
  nonSpinningReservePrice: 'NSR Price',
  // timeseries axis
  timeSeries: 'Datetime (hb)'
}

export default class TimeSeriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, null, ['Start Datetime (hb)', 'Demand Charge Billing Periods']);
    this.heatMapLabels = this.createHeatMapXAxisLabels(0);
    this.columnsNames = [
      // {minuendColumnName, subtrahendColumnName, traceName}
      {
        subtrahendColumnName: 'Net Load (kW)',
        traceName: TRACE_NAMES.netLoad,
      },
      {
        minuendColumnName: 'System Load (kW)',
        traceName: TRACE_NAMES.systemLoad,
      },
      {
        minuendColumnName: 'Deferral: Load (kW)',
        traceName: TRACE_NAMES.deferralLoad,
      },
      {
        minuendColumnName: 'Total Original Load (kW)',
        traceName: TRACE_NAMES.totalOriginalLoad,
      },
      {
        minuendColumnName: 'Total Load (kW)',
        traceName: TRACE_NAMES.totalLoad,
      },
      {
        minuendColumnName: 'Total Generation (kW)',
        traceName: TRACE_NAMES.totalGeneration,
      },
      {
        minuendColumnName: 'Total Storage Power (kW)',
        traceName: TRACE_NAMES.totalEssPower,
      },
      {
        minuendColumnName: 'Critical Load (kW)',
        traceName: TRACE_NAMES.critialLoad,
      },
      {
        minuendColumnName: 'Deferral: Power Requirement (kW)',
        traceName: TRACE_NAMES.deferralRequirement,
      },
      {
        minuendColumnName: 'FR Up Price ($/kW)',
        traceName: TRACE_NAMES.frequencyRegulationUpPrice,
      },
      {
        minuendColumnName: 'FR Down Price ($/kW)',
        traceName: TRACE_NAMES.frequencyRegulationDownPrice,
      },
      {
        minuendColumnName: 'LF Up Price ($/kW)',
        traceName: TRACE_NAMES.loadFollowingUpPrice,
      },
      {
        minuendColumnName: 'LF Down Price ($/kW)',
        traceName: TRACE_NAMES.loadFollowingDownPrice,
      },
      {
        minuendColumnName: 'SR Price ($/kW)',
        traceName: TRACE_NAMES.spinningReservePrice,
      },
      {
        minuendColumnName: 'NSR Price ($/kW)',
        traceName: TRACE_NAMES.nonSpinningReservePrice,
      },
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

    return [
      {
        data: aggregatedStateOfCharge,
        label: TRACE_NAMES.aggregatedStateOfCharge,
      },
      ...this.grabDataColumns(tsData),
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

  static subtractDataArrays(minuend, substrahend) {
    return minuend.map((el, i) => el - substrahend[i]);
  }
  static negateDataArray(data) {
    return _.map(data, val => (val * -1));
  }
  static dataLabel(data, label) {
    return { data, label };
  }

  grabColumnData(tsData) {
    const columnData = [];
    _.forEach(this.columnsNames, (payload) => {
      const { minuendColumnName, subtrahendColumnName, traceName } = payload;
      console.log(traceName);
      if (minuendColumnName !== undefined && substrahend !== undefined) {
        const dischargeDataName = BaseTableData.toCamelCaseString(minuendColumnName);
        const dischargeData = tsData[dischargeDataName];
        const chargeDataName = BaseTableData.toCamelCaseString(subtrahendColumnName);
        const chargeData = tsData[chargeDataName];
        if (dischargeData !== undefined && chargeData !== undefined) {
          const data = TimeSeriesData.subtractDataArrays(dischargeData, chargeData);
          columnData.push(TimeSeriesData.dataLabel(data, traceName));
        }
      } else if (minuendColumnName !== undefined) {
        const dischargeDataName = BaseTableData.toCamelCaseString(minuendColumnName);
        const dischargeData = tsData[dischargeDataName];
        if (dischargeData !== undefined) {
          columnData.push(TimeSeriesData.dataLabel(dischargeData, traceName));
        }
      } else if (substrahend !== undefined) {
        const chargeDataName = BaseTableData.toCamelCaseString(subtrahendColumnName);
        const chargeData = tsData[chargeDataName];
        if (chargeData !== undefined) {
          const data = TimeSeriesData.negateDataArray(chargeData);
          columnData.push(TimeSeriesData.dataLabel(data, traceName));
        }
      }
    });
    return columnData;
  }
}
