import cloneDeep from 'lodash/cloneDeep';
import TimeSeriesBase from '@/models/TimeSeries/TimeSeriesBase.js';

describe('TimeSeriesBase model', () => {
  it('should create instance properties properly', () => {
    let ts = new TimeSeriesBase(
      'Header With Unit (m/s)',
      [3, 4, 5],
    );
    expect('m/s').to.eql(ts.unit);
    expect('Header With Unit (m/s)').to.eql(ts.columnHeaderName);
    ts = new TimeSeriesBase(
      'Header Without Unit m/s)',
      [3, 4, 5],
    );
    expect('').to.eql(ts.unit);
    ts = new TimeSeriesBase(
      'Header Without Unit (m/s',
      [3, 4, 5],
    );
    expect('').to.eql(ts.unit);
    ts = new TimeSeriesBase(
      'Header Without Unit m/s',
      [3, 4, 5],
    );
    expect('').to.eql(ts.unit);
  });
});
