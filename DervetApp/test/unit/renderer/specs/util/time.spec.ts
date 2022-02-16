import { isLeapYear, getNumberOfTimeStepsInYear } from '@/util/time';

describe('util/time', () => {
  it('should correctly identify leap year', () => {
    expect(isLeapYear(2000)).to.eql(true);
    expect(isLeapYear(2001)).to.eql(false);
    expect(isLeapYear(2004)).to.eql(true);
  });

  it('should return the number of timesteps in a year', () => {
    expect(getNumberOfTimeStepsInYear(2003, 60)).to.eql(8760);
    expect(getNumberOfTimeStepsInYear(2004, 60)).to.eql(8784);
  });
});
