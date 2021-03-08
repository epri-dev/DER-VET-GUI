import pullDateFromDateTime from '@/util/time';
import isArrayAllZeros from '@/util/logic';

export default class DispatchPlotData {
  constructor(data) {
    this.data = data;
    // booleans that indicate which charts/data traces will be included
    this.socIncluded = DispatchPlot.isDataExisting(this.aggregatedSOC.data);
    this.batteryIncluded = this.socIncluded;
    this.pvIncluded = false;
    this.dgIncluded = false;
    this.evIncluded = false;
    this.generationIncluded = false;
    this.loadIncluded = false;

    this.netLoadIncluded = true;

    this.energyPriceIncluded = true;
    this.srIncluded = true;
    this.frIncluded = true;
    this.nsrIncluded = true;
    this.lfIncluded = true;
  }
  iter(windowSize, startDate = null, endDate = null) {
    
  }
  next() {

  }
  previous() {

  }
  static isDataExisting(data) {
    return (data !== null) && !isArrayAllZeros(data);
  }
  static iterDataStructure(aggregatedSOC, internalPower, poiPower, timeSeriesDateAxis, energyPrice,
      marketPrices, reservations) {
    return {
      aggregatedSOC,
      internalPower,
      poiPower,
      timeSeriesDateAxis,
      energyPrice,
      marketPrices,
      reservations,
    };
  }
}
