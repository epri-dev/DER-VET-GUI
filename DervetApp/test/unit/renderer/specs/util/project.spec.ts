import { trimEmptyRows } from '@/util/project';

import { makeTestHeader } from '../shared';

describe('util/project', () => {
  makeTestHeader('-- PROJECT UTIL --');

  it('should trim tariff data properly', () => {
    const data1 = [[1, 2], []];
    const data2 = [[1, 2], [null]];
    const data3 = [[1, 2], [null, null, null]];

    const actual1 = trimEmptyRows(data1);
    const actual2 = trimEmptyRows(data2);
    const actual3 = trimEmptyRows(data3);

    expect(actual1).to.eql([[1, 2]]);
    expect(actual2).to.eql([[1, 2]]);
    expect(actual3).to.eql([[1, 2]]);
  });
});
