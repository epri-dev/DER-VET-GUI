import TimeSeriesData from '@/models/Results/TimeSeriesData';

describe('TimeSeriesData model', () => {
  it('(1A) sucessfull convert an array into a 24x10 matrix', () => {
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
    // const expectedDataArr = [
    //   [1, 25, 46],
    //   [2, 26, 47],
    //   [3, 27, 48],
    //   [4, 28, 49],
    //   [5, 29, 50],
    //   [6, 30, 51],
    //   [7, 31, 52],
    //   [8, 32, 53],
    //   [9, 33, 54],
    //   [10, 34, 55],
    //   [11, 35, 56],
    //   [12, 36, 57],
    //   [13, 37, 58],
    //   [14, 38, 59],
    //   [15, 39, 60],
    //   [16, 40, 61],
    //   [17, 41, 62],
    //   [18, 42, 63],
    //   [19, 43, 64],
    //   [20, 44, 65],
    //   [24, 45, 66],
    // ];
    const actualDataArr = TimeSeriesData.listToMap(testArray);
    console.log(actualDataArr);
    expect(actualDataArr).to.eql(expectedDataArr);
  });
});
