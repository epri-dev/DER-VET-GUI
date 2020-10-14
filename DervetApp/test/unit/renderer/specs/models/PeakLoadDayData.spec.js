import {
  PeakLoadDayData,
  peakLoadDayArrayData,
  peakLoadDayDefaultData,
} from '@/models/Results/PeakLoadDayData';

describe('PeakLoadDayData model', () => {
  const actualData = new PeakLoadDayData(peakLoadDayArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      ['0.0', '2030-08-17', '613.7918243741753', ''],
      ['1.0', '2030-08-17', '613.7918250140538', ''],
      ['2.0', '2030-08-17', '613.7918243741753', ''],
      ['3.0', '2030-08-17', '1105.7151141568495', ''],
      ['4.0', '2030-08-17', '745.1550592547193', ''],
      ['5.0', '2030-08-17', '2103.0448815544833', ''],
      ['6.0', '2030-08-17', '2278.000659782306', ''],
      ['7.0', '2030-08-17', '3477.1465186550836', ''],
      ['8.0', '2030-08-17', '3446.8559320650966', ''],
      ['9.0', '2030-08-17', '3378.0031521800074', ''],
      ['10.0', '2030-08-17', '3399.1924464338945', ''],
      ['11.0', '2030-08-17', '3292.6136920439503', ''],
      ['12.0', '2030-08-17', '3485.940315255632', ''],
      ['13.0', '2030-08-17', '3566.133846971848', ''],
      ['14.0', '2030-08-17', '3711.8445253903174', ''],
      ['15.0', '2030-08-17', '3914.800869648695', ''],
      ['16.0', '2030-08-17', '3531.2014155337274', ''],
      ['17.0', '2030-08-17', '2870.7101609472825', ''],
      ['18.0', '2030-08-17', '2743.725517657049', ''],
      ['19.0', '2030-08-17', '2467.740036796016', ''],
      ['20.0', '2030-08-17', '2414.033442836397', ''],
      ['21.0', '2030-08-17', '1443.0277351148752', ''],
    ];
    const expectedColumnHeaders = ['Timestep Beginning', 'Date', 'Load (kW)', 'Net Load (kW)'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1A) should have data belonging to 1 year', () => {
    expect(actualData.columnDataByYear.length).to.eql(1);
  });
  const actualDataObj = actualData.columnDataByYear[0];
  it('(2A) should have the expected values ', () => {
    expect(actualDataObj.values).to.eql(peakLoadDayDefaultData.values);
  });
  it('(2B) should have the labels ', () => {
    expect(actualDataObj.labels).to.eql(peakLoadDayDefaultData.labels);
  });
  it('(2C) should have the expected day ', () => {
    expect(actualDataObj.day).to.eql(peakLoadDayDefaultData.day);
  });
});
