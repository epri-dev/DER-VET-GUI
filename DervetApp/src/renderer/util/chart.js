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

export const formatYAxis = tick => numeral(tick).format('0,0');

export const arrayMax = (arr) => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

export const formatXAxis6Hour = (tick) => {
  // Only show ticks for hours 0, 6, 12 and 18
  if (tick === 0) {
    return '00:00';
  }
  if (tick === 6) {
    return '06:00';
  }
  if (tick === 12) {
    return '12:00';
  }
  if (tick === 18) {
    return '18:00';
  }
  return '';
};
