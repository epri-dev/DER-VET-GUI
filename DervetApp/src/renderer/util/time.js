export const getCurrentYear = () => new Date().getFullYear();

export const pullDateFromDateTime = (text) => {
  const yearList = text.match(/\d{4}-\d{2}-\d{2}/g);
  if (yearList.length) {
    return yearList[0];
  }
  return 0;
};

export const isLeapYear = dataYear => {
  if (dataYear % 400 === 0) {
    return true;
  } if (dataYear % 100 === 0) {
    return false;
  } if (dataYear % 4 === 0) {
    return true;
  }
  return false;
};

export const getNumberOfTimeStepsInYear = (dataYear, timestep) => {
  const timestepsInDay = 24 * (60 / timestep);
  const daysInYear = isLeapYear(dataYear) ? 366 : 365;
  return timestepsInDay * daysInYear;
};

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
