import { max } from 'lodash';
import numeral from 'numeral';

export const formatYAxisCurrency = (tick, index, ticks) => {
  // If the maximum tick value is >= 1 million then divide all tick marks by 1mm
  // and show one decimal point
  if (max(ticks) >= 1e6) {
    return `${numeral(tick / 1e6).format('$0,0')}m`;
  }
  return numeral(tick).format('$0,0');
};

export const formatYAxis = tick => numeral(tick).format('0,0.[000]');
