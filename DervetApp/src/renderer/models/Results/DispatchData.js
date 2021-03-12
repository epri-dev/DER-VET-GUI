import moment from 'moment';
// import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import { isArrayAllZeros } from '@/util/logic';
import BaseTableData from './BaseTableData';

const TRACE_NAMES = {
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

export default class DispatchData {
  constructor(dataByYear, totalEnergyStorageCap) {
    this.data = this.initializeDataLabelList(dataByYear, totalEnergyStorageCap);

    this.dateTime = this.findDataLabel(TRACE_NAMES.timeSeries);
    this.value = null;
    this.selectedData = null;
    this.currentStartIndex = 0;
    this.currentEndIndex = 23;
    this.windowSize = 'years';
    // console.log(this.dateTime[0]); // TODO remove
    // booleans that indicate which charts/data traces will be included
    this.netLoadIncluded = true;
    this.energyPriceIncluded = true;
    this.socIncluded = this.isExisting(TRACE_NAMES.aggregateEssStateOfCharge);
    this.essIncluded = this.isExisting(TRACE_NAMES.totalEssPower);
    this.generationIncluded = this.isExisting(TRACE_NAMES.totalGeneration);
    this.originalIncluded = this.isExisting(TRACE_NAMES.totalOriginalLoad);
    this.loadIncluded = this.isExisting(TRACE_NAMES.totalLoad);
    this.srIncluded = this.isExisting(TRACE_NAMES.spinningReservePrice);
    this.frIncluded = this.isExisting(TRACE_NAMES.frequencyRegulationUpPrice);
    this.nsrIncluded = this.isExisting(TRACE_NAMES.nonSpinningReservePrice);
    this.lfIncluded = this.isExisting(TRACE_NAMES.loadFollowingUpPrice);

    this.internalPowerTraceList = [
      TRACE_NAMES.totalOriginalLoad,
      TRACE_NAMES.totalLoad,
      TRACE_NAMES.totalGeneration,
      TRACE_NAMES.totalEssPower,
      TRACE_NAMES.critialLoad,
      TRACE_NAMES.deferralRequirement,
    ];
    this.poiPowerTraceList = [
      TRACE_NAMES.systemLoad,
      TRACE_NAMES.netLoad,
      TRACE_NAMES.deferralLoad,
    ];
    this.marketPricesTraceList = [
      TRACE_NAMES.frequencyRegulationUpPrice,
      TRACE_NAMES.frequencyRegulationDownPrice,
      TRACE_NAMES.loadFollowingUpPrice,
      TRACE_NAMES.loadFollowingDownPrice,
      TRACE_NAMES.spinningReservePrice,
      TRACE_NAMES.nonSpinningReservePrice,
    ];
    this.reservationsTraceList = [
      TRACE_NAMES.spinningReserve,
      TRACE_NAMES.nonSpinningReserve,
      TRACE_NAMES.frequencyRegulationDown,
      TRACE_NAMES.frequencyRegulationUp,
      TRACE_NAMES.loadFollowingDown,
      TRACE_NAMES.loadFollowingUp,
    ];
  }

  initializeDataLabelList(dataByYear, totalEnergyStorageCap) {
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
          const data = DispatchData.subtractDataArrays(minuend, subtrahend);
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
          const data = DispatchData.negateDataArray(subtrahend);
          columnData.set(traceName, data);
        }
      } else if (minuendColumnName !== undefined && addendColumnName !== undefined) {
        // add numbers
        const minuendObjKey = BaseTableData.toCamelCaseString(minuendColumnName);
        const addend1 = tsData[minuendObjKey];
        const addendObjKey = BaseTableData.toCamelCaseString(addendColumnName);
        const addend2 = tsData[addendObjKey];
        if (addend1 !== undefined && addend2 !== undefined) {
          const data = DispatchData.addDataArrays(addend1, addend2);
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

  setCurrentValue(windowSize) {
    console.log(windowSize);
    // if windowSize is different, then reset start and end indices to match
    if (this.windowSize === windowSize) {
      this.windowSize = windowSize;

      const startMoment = this.currStartDate().startOf(windowSize.split(0, -1));
      const endMoment = this.currEndDate().startOf(windowSize.split(0, -1));
      this.setCurrentIndices(startMoment, endMoment);
    }
    // split data
    this.selectedData = this.sliceDataOfDataLabel();
    // put in correct structure
    this.value = this.iterDataStructure();
  }

  previous(currStartDate, currEndDate, windowSize) {
    console.log(`prev - ${[currStartDate, currEndDate]}`);
    const endMoment = moment(currStartDate);
    // find start moment
    // increment nackward from current end date (js date type) according to window size
    // convert Date into moment (moment will do things such as wrapping into the next month)
    let startMoment = null;
    if (windowSize === 'custom') {
      // determine previous window size and increment
      const daysDiff = moment(currStartDate).diff(moment(currEndDate), 'days');
      startMoment = moment(endMoment).subtract(daysDiff, 'd');
    } else {
      console.log(`windowSize: ${windowSize}`);
      startMoment = moment(endMoment).subtract(1, windowSize);
    }
    console.log(`start: ${startMoment.format()}`);
    console.log(`end: ${endMoment.format()}`);
    this.setCurrentIndices(startMoment, endMoment);
    this.setCurrentValue(windowSize);
  }

  next(currStartDate, currEndDate, windowSize) {
    console.log(`next - ${[currStartDate, currEndDate]}`);
    const startMoment = moment(currEndDate);
    // find end moment
    // increment current start date (js date type) according to window size
    // convert Date into moment (moment will do things such as wrapping into the next month)
    let endMoment = null;
    if (windowSize === 'custom') {
      // determine previous window size and increment
      const daysDiff = moment(currStartDate).diff(moment(currEndDate), 'days');
      endMoment = moment(startMoment).add(daysDiff, 'd');
    } else {
      console.log(windowSize);
      endMoment = moment(startMoment).add(1, windowSize);
    }
    console.log(`start: ${startMoment.format()}`);
    console.log(`end: ${endMoment.format()}`);
    this.setCurrentIndices(startMoment, endMoment);
    this.setCurrentValue(windowSize);
  }

  setCurrentIndices(startMoment, endMoment) {
    // find start index
    const newStartIndex = this.timeSeriesIndexOf(startMoment);
    // find end index
    const newEndIndex = this.lastTimeSeriesIndexOf(endMoment);
    // check if endIndex and startIndex is the same
    const newStartMoment = this.indexToMoment(newStartIndex);
    const newEndMoment = this.indexToMoment(newEndIndex);
    if (!DispatchData.datesMatch(newStartMoment, newEndMoment)) {
      // if not, then update this.currentStartIndex and this.currentEndIndex
      this.currentStartIndex = newStartIndex;
      this.currentEndIndex = newEndIndex;
    }
  }

  indexToMoment(index) {
    return moment(this.dateTime[index]);
  }

  currStartDate() {
    // converts the first date time of the selected/current data set into a Date type and returns
    return this.indexToMoment(this.currentStartIndex);
  }

  currEndDate() {
    // converts the last date time of the selected/current data set into a Date type and returns
    return this.indexToMoment(this.currentEndIndex);
  }

  sliceDataOfDataLabel(yearIndex = 0) {
    const slicedItems = new Map();
    this.data[yearIndex].forEach((data, traceName) => {
      const slicedDate = data.slice(this.currentStartIndex, this.currentEndIndex + 1);
      slicedItems.set(traceName, slicedDate);
    });
    return slicedItems;
  }

  static datesMatch(dateTimeString, withDate) {
    // checks if DATE_TIME_STRING matches DATE_MOMENT in 'year', 'month', and 'day'
    const dateTime = moment(dateTimeString);
    return (dateTime.isSame(withDate, 'year') && dateTime.isSame(withDate, 'month')
            && dateTime.isSame(withDate, 'day'));
  }

  findDataLabel(traceName, yearIndex = 0) {
    return this.data[yearIndex].get(traceName);
  }

  timeSeriesIndexOf(date) {
    return this.dateTime.indexOf((value) => DispatchData.datesMatch(value, date));
  }

  lastTimeSeriesIndexOf(date) {
    return this.dateTime.lastIndexOf((value) => DispatchData.datesMatch(value, date));
  }

  isExisting(traceName) {
    const dataLabel = this.data[0].has(traceName);
    return (dataLabel && !isArrayAllZeros(this.findDataLabel(traceName)));
  }

  mapToListFilter(traceNameList) {
    const dataLabelTraceList = [];
    this.selectedData.forEach((value, key) => {
      if (traceNameList.includes(key)) {
        dataLabelTraceList.push({ data: value, label: key });
      }
    });
    return dataLabelTraceList;
  }

  selectedDataLabel(traceName) {
    const data = this.selectedData.get(traceName);
    return { data, label: traceName };
  }

  iterDataStructure() {
    const timeSeriesDateAxis = this.selectedDataLabel(TRACE_NAMES.timeseries);
    const energyPrice = this.selectedDataLabel(TRACE_NAMES.energyPrice);
    const aggregatedSOC = this.selectedDataLabel(TRACE_NAMES.aggregateEssStateOfCharge);

    const internalPower = this.mapToListFilter(this.internalPowerTraceList);

    const poiPower = this.mapToListFilter(this.poiPowerTraceList);

    const marketPrices = this.mapToListFilter(this.marketPricesTraceList);

    const reservations = this.mapToListFilter(this.reservationsTraceList);
    return {
      timeSeriesDateAxis, // object
      energyPrice, // object
      aggregatedSOC, // object
      internalPower, // array
      poiPower, // array
      marketPrices, // array
      reservations, // array
    };
  }
}
