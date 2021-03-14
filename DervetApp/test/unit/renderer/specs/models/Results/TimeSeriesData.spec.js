import { TimeSeriesData } from '@/models/Results/TimeSeriesData';

describe('TimeSeriesData model', () => {
  it('(1) sucessfull convert an array into a 24x10 matrix', () => {
    const days = 5;
    const testArray = Array.from({ length: 24 * days }, (_, i) => i + 1);
    const expectedDataArr = [
      Array.from({ length: days }, (_, i) => (24 * i) + 1),
      Array.from({ length: days }, (_, i) => (24 * i) + 2),
      Array.from({ length: days }, (_, i) => (24 * i) + 3),
      Array.from({ length: days }, (_, i) => (24 * i) + 4),
      Array.from({ length: days }, (_, i) => (24 * i) + 5),
      Array.from({ length: days }, (_, i) => (24 * i) + 6),
      Array.from({ length: days }, (_, i) => (24 * i) + 7),
      Array.from({ length: days }, (_, i) => (24 * i) + 8),
      Array.from({ length: days }, (_, i) => (24 * i) + 9),
      Array.from({ length: days }, (_, i) => (24 * i) + 10),
      Array.from({ length: days }, (_, i) => (24 * i) + 11),
      Array.from({ length: days }, (_, i) => (24 * i) + 12),
      Array.from({ length: days }, (_, i) => (24 * i) + 13),
      Array.from({ length: days }, (_, i) => (24 * i) + 14),
      Array.from({ length: days }, (_, i) => (24 * i) + 15),
      Array.from({ length: days }, (_, i) => (24 * i) + 16),
      Array.from({ length: days }, (_, i) => (24 * i) + 17),
      Array.from({ length: days }, (_, i) => (24 * i) + 18),
      Array.from({ length: days }, (_, i) => (24 * i) + 19),
      Array.from({ length: days }, (_, i) => (24 * i) + 20),
      Array.from({ length: days }, (_, i) => (24 * i) + 21),
      Array.from({ length: days }, (_, i) => (24 * i) + 22),
      Array.from({ length: days }, (_, i) => (24 * i) + 23),
      Array.from({ length: days }, (_, i) => (24 * i) + 24),
    ];
    const actualDataArr = TimeSeriesData.listToMap(testArray);
    expect(actualDataArr).to.eql(expectedDataArr);
  });
});
