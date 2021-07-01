import moment from 'moment';
import indexOf from 'lodash/indexOf';
import lastIndexOf from 'lodash/lastIndexOf';
import { isArrayAllZeros } from '@/util/logic';

export default class DispatchData {
  constructor(data, traceNames) {
    this.data = data;
    this.traceNames = traceNames;
    this.dateTime = this.findDataLabel(this.traceNames.timeSeries);
    // booleans that indicate which charts/data traces will be included
    this.netLoadIncluded = true;
    this.energyPriceIncluded = true;
    this.socIncluded = this.isExisting(this.traceNames.aggregateEssStateOfCharge);
    this.essIncluded = this.isExisting(this.traceNames.totalEssPower);
    this.generationIncluded = this.isExisting(this.traceNames.totalGeneration);
    this.originalIncluded = this.isExisting(this.traceNames.totalOriginalLoad);
    this.loadIncluded = this.isExisting(this.traceNames.totalLoad);
    this.srIncluded = this.isExisting(this.traceNames.spinningReservePrice);
    this.frIncluded = this.isExisting(this.traceNames.frequencyRegulationUpPrice);
    this.nsrIncluded = this.isExisting(this.traceNames.nonSpinningReservePrice);
    this.lfIncluded = this.isExisting(this.traceNames.loadFollowingUpPrice);

    this.maxDate = this.dateTime[this.dateTime.length - 1];
    [this.minDate] = this.dateTime;
    this.internalPowerTraceList = [
      this.traceNames.totalOriginalLoad,
      this.traceNames.totalLoad,
      this.traceNames.totalGeneration,
      this.traceNames.totalEssPower,
      this.traceNames.critialLoad,
      this.traceNames.deferralRequirement,
    ];
    this.poiPowerTraceList = [
      this.traceNames.systemLoad,
      this.traceNames.netLoad,
      this.traceNames.deferralLoad,
    ];
    this.marketPricesTraceList = [
      this.traceNames.frequencyRegulationUpPrice,
      this.traceNames.frequencyRegulationDownPrice,
      this.traceNames.loadFollowingUpPrice,
      this.traceNames.loadFollowingDownPrice,
      this.traceNames.spinningReservePrice,
      this.traceNames.nonSpinningReservePrice,
    ];
    this.reservationsTraceList = [
      this.traceNames.spinningReserve,
      this.traceNames.nonSpinningReserve,
      this.traceNames.frequencyRegulationDown,
      this.traceNames.frequencyRegulationUp,
      this.traceNames.loadFollowingDown,
      this.traceNames.loadFollowingUp,
    ];

    this.value = null;
    this.selectedData = null;
    this.currentStartIndex = 0;
    this.currentEndIndex = 23;
    this.windowSize = 'days';
  }

  setCurrentWindow(windowSize, newStart = null, newEnd = null) {
    // if windowSize is different, then reset start and end indices to match
    if (this.windowSize !== windowSize) {
      let startMoment;
      let endMoment;
      if (windowSize === 'custom') {
        startMoment = moment(newStart);
        endMoment = moment(newEnd);
      } else {
        this.windowSize = windowSize;
        const windowSizeDroppedEnd = windowSize.slice(0, -1);
        startMoment = this.currStartDate().startOf(windowSizeDroppedEnd);
        endMoment = moment(startMoment).add(1, windowSize);
      }
      this.setCurrentIndices(startMoment, endMoment);
    }
    // split data
    this.selectedData = this.sliceDataOfDataLabel();
    // put in correct structure
    this.value = this.iterDataStructure();
  }

  previous(currStartDate, currEndDate, windowSize) {
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
      startMoment = moment(endMoment).subtract(1, windowSize);
    }
    this.setCurrentIndices(startMoment, endMoment);
    this.setCurrentWindow(windowSize);
  }

  next(currStartDate, currEndDate, windowSize) {
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
      endMoment = moment(startMoment).add(1, windowSize);
    }
    this.setCurrentIndices(startMoment, endMoment);
    this.setCurrentWindow(windowSize);
  }

  setCurrentIndices(startMoment, endMoment) {
    // find start index
    const newStartIndex = this.timeSeriesIndexOf(startMoment);
    // find end index
    const newEndIndex = this.lastTimeSeriesIndexOf(endMoment);
    // check if endIndex and startIndex is the same
    const newStartMoment = this.indexToMoment(newStartIndex);
    const newEndMoment = this.indexToMoment(newEndIndex);
    if (!newStartMoment.isSame(newEndMoment)) {
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
      const slicedDate = data.slice(this.currentStartIndex, this.currentEndIndex);
      slicedItems.set(traceName, slicedDate);
    });
    return slicedItems;
  }

  findDataLabel(traceName, yearIndex = 0) {
    return this.data[yearIndex].get(traceName);
  }

  timeSeriesIndexOf(date) {
    const stringDate = date.format(DispatchData.dateFormat());
    return indexOf(this.dateTime, stringDate);
  }

  lastTimeSeriesIndexOf(date) {
    return lastIndexOf(this.dateTime, date.format(DispatchData.dateFormat()));
  }

  static dateFormat() {
    return 'YYYY-MM-DD HH:mm:ss';
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
    const timeSeriesDateAxis = this.selectedDataLabel(this.traceNames.timeSeries);
    const energyPrice = this.selectedDataLabel(this.traceNames.energyPrice);
    const aggregatedSOC = this.selectedDataLabel(this.traceNames.aggregateEssStateOfCharge);

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
