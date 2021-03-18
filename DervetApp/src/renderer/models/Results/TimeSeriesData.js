import forEach from 'lodash/forEach';
import map from 'lodash/map';
import { pullDateFromDateTime } from '@/util/time';
import BaseTableData from './BaseTableData';

export const TRACE_NAMES = {
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
  aggregateEssStateOfCharge: 'Aggregated SOE / total ESS Energy Capacity',
  // prices
  energyPrice: 'Energy Price',
  frequencyRegulationUpPrice: 'FR Up Price',
  frequencyRegulationDownPrice: 'FR Down Price',
  loadFollowingUpPrice: 'LF Up Price',
  loadFollowingDownPrice: 'LF Down Price',
  spinningReservePrice: 'SR Price',
  nonSpinningReservePrice: 'NSR Price',
  // timeseries axis
  timeSeries: 'Datetime (hb)',
};

const COLUMN_TO_TRACE = [
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
    addendColumnName: 'Spinning Reserve Down (Charging) (kW)',
    traceName: TRACE_NAMES.spinningReserve,
  },
  {
    minuendColumnName: 'Non-spinning Reserve Down (Disharging) (kW)',
    addendColumnName: 'Non-spinning Reserve Down (Charging) (kW)',
    traceName: TRACE_NAMES.nonSpinningReserve,
  },
  {
    minuendColumnName: 'Frequency Regulation Down (Discharging) (kW)',
    addendColumnName: 'Frequency Regulation Down (Charging) (kW)',
    traceName: TRACE_NAMES.frequencyRegulationDown,
  },
  {
    minuendColumnName: 'Frequency Regulation Up (Discharging) (kW)',
    addendColumnName: 'Frequency Regulation Up (Charging) (kW)',
    traceName: TRACE_NAMES.frequencyRegulationUp,
  },
  {
    minuendColumnName: 'Load Following Down (Discharging) (kW)',
    addendColumnName: 'Load Following Down (Charging) (kW)',
    traceName: TRACE_NAMES.loadFollowingDown,
  },
  {
    minuendColumnName: 'Load Following Up (Discharging) (kW)',
    addendColumnName: 'Load Following Up (Charging) (kW)',
    traceName: TRACE_NAMES.loadFollowingUp,
  },
  {
    minuendColumnName: 'Energy Price ($/kWh)',
    traceName: TRACE_NAMES.energyPrice,
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

export class TimeSeriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, null, ['Start Datetime (hb)', 'Demand Charge Billing Periods']);
    this.heatMapLabels = this.createHeatMapXAxisLabels(0);
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

  timeSeriesDateAxis(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.startDatetimeHb;
  }

  energyPriceHeatMapTraceData(yearIndex) {
    const z = TimeSeriesData.listToMap(this.energyPriceTimeSeriesData(yearIndex));
    const x = this.heatMapLabels;
    const y = Array.from({ length: 24 }, (_, i) => i); // hour begining
    return { x, y, z };
  }

  energyPriceTimeSeriesData(yearIndex) {
    const tsData = this.columnDataByYear[yearIndex];
    return tsData.energyPriceKWh;
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

  static listToMap(list) {
    const data = [[], [], [], [], [], [], [], [], [], [], [], [],
      [], [], [], [], [], [], [], [], [], [], [], []];
    let hourOfDay = 0;
    forEach(list, (item) => {
      if (hourOfDay === 24) {
        hourOfDay = 0;
      }
      data[hourOfDay].push(item);
      hourOfDay += 1;
    });
    return data;
  }

  dispatchData(totalEnergyStorageCap) {
    const dispatchPlotData = this.createDataLabelList(this.columnDataByYear, totalEnergyStorageCap);
    return dispatchPlotData;
  }

  createDataLabelList(dataByYear, totalEnergyStorageCap) {
    const dataLabelByYear = [];
    forEach(dataByYear, tsData => {
      const dataLabelMap = this.grabColumnData(tsData);
      dataLabelMap.set(TRACE_NAMES.timeSeries, tsData.startDatetimeHb);
      if (totalEnergyStorageCap) {
        const aggregatedStateOfEnergy = tsData.aggregatedStateOfEnergyKWh;
        const aggregatedSOC = aggregatedStateOfEnergy.map(i => i / totalEnergyStorageCap);
        dataLabelMap.set(TRACE_NAMES.aggregateEssStateOfCharge, aggregatedSOC);
      }
      dataLabelByYear.push(dataLabelMap);
    });
    return dataLabelByYear;
  }

  grabColumnData(tsData) {
    const columnData = new Map();
    forEach(COLUMN_TO_TRACE, (payload) => {
      const { minuendColumnName, subtrahendColumnName, addendColumnName, traceName } = payload;
      if (minuendColumnName !== undefined && subtrahendColumnName !== undefined) {
        // subtract numbers (currently not used but keeping for full functionallity)
        const minuendObjKey = BaseTableData.toCamelCaseString(minuendColumnName);
        const minuend = tsData[minuendObjKey];
        const subtrahendObjKey = BaseTableData.toCamelCaseString(subtrahendColumnName);
        const subtrahend = tsData[subtrahendObjKey];
        if (minuend !== undefined && subtrahend !== undefined) {
          const data = TimeSeriesData.subtractDataArrays(minuend, subtrahend);
          columnData.set(traceName, data);
        }
      } else if (minuendColumnName !== undefined) {
        // dont need to transform data
        const minuendObjKey = BaseTableData.toCamelCaseString(minuendColumnName);
        const data = tsData[minuendObjKey];
        if (data !== undefined) {
          columnData.set(traceName, data);
        }
      } else if (subtrahendColumnName !== undefined) {
        // negate the numbers in the array
        const subtrahendObjKey = BaseTableData.toCamelCaseString(subtrahendColumnName);
        const subtrahend = tsData[subtrahendObjKey];
        if (subtrahend !== undefined) {
          const data = TimeSeriesData.negateDataArray(subtrahend);
          columnData.set(traceName, data);
        }
      } else if (minuendColumnName !== undefined && addendColumnName !== undefined) {
        // add numbers
        const minuendObjKey = BaseTableData.toCamelCaseString(minuendColumnName);
        const addend1 = tsData[minuendObjKey];
        const addendObjKey = BaseTableData.toCamelCaseString(addendColumnName);
        const addend2 = tsData[addendObjKey];
        if (addend1 !== undefined && addend2 !== undefined) {
          const data = TimeSeriesData.addDataArrays(addend1, addend2);
          columnData.set(traceName, data);
        }
      }
    });
    return columnData;
  }

  static subtractDataArrays(minuend, substrahend) {
    return minuend.map((el, i) => el - substrahend[i]);
  }

  static addDataArrays(addend1, addend2) {
    return addend1.map((el, i) => el + addend2[i]);
  }

  static negateDataArray(data) {
    return map(data, val => (val * -1));
  }
}
