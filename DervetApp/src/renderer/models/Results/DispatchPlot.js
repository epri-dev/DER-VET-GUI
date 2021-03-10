import moment from 'moment';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import isArrayAllZeros from '@/util/logic';
import TRACE_NAMES from './TimeSeriesData';

export default class DispatchPlotData {
  constructor(data) {
    this.data = data;

    this.currentData = null;
    this.currentStartIndex = 0;
    this.currentEndIndex = -1;
    this.windowSize = 'years';
    this.dateTime = this.findDataLabel(TRACE_NAMES.timeSeries).data;
    console.log(this.dateTime[0]); // TODO remove
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
  }

  current() {
    // if windowSize is different, then reset start and end indices to match

    // split data

    // put in correct structure
  }

  previous() {
    // find startDate index

    // find EndDate index (if none, choose -1)

  }

  next(windowSize, currStartDate, currEndDate) {
    this.windowSize = windowSize;
    const startMoment = moment(currEndDate);
    // find end moment
    // increment current start date (js date type) according to window size
    // convert Date into moment (moment will do things such as wrapping into the next month)
    let endMoment = null;
    if (windowSize === 'days') {
      endMoment = moment(startMoment).add(1, 'd');
    } else if (windowSize === 'weeks') {
      endMoment = moment(startMoment).add(7, 'd');
    } else if (windowSize === 'months') {
      endMoment = moment(startMoment).add(1, 'm');
    } else if (windowSize === 'years') {
      endMoment = moment(startMoment).add(1, 'y');
    } else if (windowSize === 'custom') {
      // determine previous window size and increment
      const daysDiff = moment(currStartDate).diff(moment(currEndDate), 'days');
      endMoment = moment(startMoment).add(daysDiff, 'd');
    }
    // find start index
    const newStartIndex = this.timeSeriesIndexOf(startMoment);
    // find end index
    const newEndIndex = this.lastTimeSeriesIndexOf(endMoment);
    // check if endIndex and startIndex is the same
    const newStartMoment = this.indexToMoment(newStartIndex);
    const newEndMoment = this.indexToMoment(newEndIndex);
    if (!DispatchPlotData.datesMatch(newStartMoment, newEndMoment)) {
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

  sliceDataOfDataLabel(startIndex, endIndex) {
    const slicedItems = [];
    forEach(this.data, (item) => {
      const { label, data } = item;
      const newItem = {
        data: data.slice(startIndex, endIndex + 1),
        label,
      };
      slicedItems.push(newItem);
    });
    return slicedItems;
  }

  static datesMatch(dateTimeString, withDate) {
    // checks if DATE_TIME_STRING matches DATE_MOMENT in 'year', 'month', and 'day'
    const dateTime = moment(dateTimeString);
    return (dateTime.isSame(withDate, 'year') && dateTime.isSame(withDate, 'month')
            && dateTime.isSame(withDate, 'day'));
  }

  findDataLabel(traceName) {
    return find(this.data, { traceName });
  }

  timeSeriesIndexOf(date) {
    return this.dateTime.indexOf((value) => DispatchPlotData.datesMatch(value, date));
  }

  lastTimeSeriesIndexOf(date) {
    return this.dateTime.lastIndexOf((value) => DispatchPlotData.datesMatch(value, date));
  }

  isExisting(traceName) {
    const dataLabel = this.findDataLabel(traceName);
    console.log(JSON.stringify(dataLabel, null, 1));
    return (dataLabel.length !== 0 && !isArrayAllZeros(dataLabel.data));
  }

  static iterDataStructure(aggregatedSOC, internalPower, poiPower, timeSeriesDateAxis, energyPrice,
    marketPrices, reservations) {
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
