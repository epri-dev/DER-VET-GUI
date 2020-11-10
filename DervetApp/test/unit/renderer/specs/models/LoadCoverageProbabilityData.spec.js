import {
  LoadCoverageProbabilityData,
  loadCoverageArrayData,
  loadCoverageProbDefaultData,
} from '@/models/Results/LoadCoverageProbabilityData';

describe('LoadCoverageProbabilityData model', () => {
  const actualData = new LoadCoverageProbabilityData(loadCoverageArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 0.980468304],
      [7, 0.720470642],
      [8, 0.635439278],
      [9, 0.578610603],
      [10, 0.514912581],
      [11, 0.444914286],
      [12, 0.381986513],
      [13, 0.304641061],
      [14, 0.218131931],
      [15, 0.181797393],
      [16, 0.150943396],
      [17, 0.122369625],
      [18, 0.102596363],
      [19, 0.084191261],
      [20, 0.069442856],
      [21, 0.058352403],
      [22, 0.047373841],
      [23, 0.036850538],
      [24, 0.023005608],
      [25, 0.014652015],
      [26, 0.013050944],
      [27, 0.010991527],
      [28, 0.009275163],
      [29, 0.008703619],
      [30, 0.008475547],
      [31, 0.008247423],
      [32, 0.007675564],
      [33, 0.007332722],
      [34, 0.006875215],
      [35, 0.006646803],
      [36, 0.006074499],
      [37, 0.005502063],
      [38, 0.004470939],
      [39, 0.003554231],
      [40, 0.002751978],
      [41, 0.001720183],
      [42, 0.001146921],
      [43, 0.001032347],
      [44, 0.00068831],
      [45, 0.000344195],
      [46, 0],
      [47, 0],
      [48, 0],
      [49, 0],
      [50, 0],
      [51, 0],
      [52, 0],
      [53, 0],
      [54, 0],
      [55, 0],
      [56, 0],
      [57, 0],
      [58, 0],
      [59, 0],
      [60, 0],
      [61, 0],
      [62, 0],
      [63, 0],
      [64, 0],
      [65, 0],
      [66, 0],
      [67, 0],
      [68, 0],
      [69, 0],
      [70, 0],
      [71, 0],
      [72, 0],
      [73, 0],
      [74, 0],
      [75, 0],
      [76, 0],
      [77, 0],
      [78, 0],
      [79, 0],
      [80, 0],
      [null],
    ];
    const expectedColumnHeaders = ['Outage Length (hrs)', 'Load Coverage Probability (%)'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1A) should have data belonging to 1 year', () => {
    expect(actualData.columnDataByYear.length).to.eql(1);
  });
  const actualDataObj = actualData.getFirstYearChartData();
  it('(2A) should have the expected values ', () => {
    const expectedLoadCoverageProb = loadCoverageProbDefaultData.loadCoverageProbability;
    expect(actualDataObj.loadCoverageProbability).to.eql(expectedLoadCoverageProb);
  });
  it('(2B) should have the labels ', () => {
    expect(actualDataObj.outageLengthHrs).to.eql(loadCoverageProbDefaultData.outageLengthHrs);
  });
  it('(3) should have the correct keys ', () => {
    const actualKeys = Object.keys(actualDataObj);
    const expectedKeys = Object.keys(loadCoverageProbDefaultData);
    let i = 0;
    while (i < expectedKeys.length) {
      expect(actualKeys[i]).to.eql(expectedKeys[i]);
      i += 1;
    }
  });
});
